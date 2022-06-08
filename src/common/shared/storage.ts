interface StoreItem<T> {
    value: T;
    expire: number | null;
}

interface StoreItemDetails<
    K extends keyof D,
    D extends Record<string, unknown>
> {
    namespace: string;
    index: number;
    expire: number | null;
    key: K;
    value: D[K];
}

function hasOwn(obj: unknown, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

function isStoreItem<D>(v: unknown): v is StoreItem<D> {
    return (
        v != null &&
        typeof v === "object" &&
        !Array.isArray(v) &&
        hasOwn(v, "value") &&
        (!hasOwn(v, "expire") ||
            typeof (v as { expire: unknown }).expire === "number" ||
            (v as { expire: unknown }).expire == null)
    );
}

function isExpire(expire: number | null): boolean {
    if (expire == null) return false;
    return expire < new Date().getTime();
}

export class StorageProxy<
    Key extends keyof Data,
    Data extends Record<string, unknown>
> {
    protected storage: Storage;
    protected namespace: string;
    protected regex: RegExp;

    constructor(storage: Storage, namespace: string) {
        const ns: string = namespace.trim();
        if (!ns) throw new Error("invalid namespace");
        this.storage = storage;
        this.namespace = ns;
        this.regex = new RegExp(`^${ns}.+`, "i");
    }

    get length(): number {
        let n = 0;
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (!key || !this.regex.test(key)) {
                continue;
            }
            n++;
        }
        return n;
    }

    lookup(key: Key, indexed = false): StoreItemDetails<Key, Data> | null {
        const namespace: string = this.namespace;
        let data: string | null = null;
        let index = -1;

        if (!indexed) {
            data = this.storage.getItem(namespace + (key as string));
        } else {
            for (let i = 0; i < this.storage.length; i++) {
                const _key = this.storage.key(i);
                if (!_key || !this.regex.test(_key)) {
                    continue;
                }
                if (_key === this.namespace + (key as string)) {
                    index = i;
                    data = this.storage.getItem(_key);
                    break;
                }
            }
        }

        if (data == null) {
            return null;
        }

        try {
            const info = JSON.parse(data);
            if (!isStoreItem<Data[Key]>(info) || isExpire(info.expire)) {
                return null;
            }
            return {
                namespace,
                index,
                key,
                value: info.value,
                expire: info.expire,
            };
        } catch (e) {
            console.error(e);
        }

        return null;
    }

    key(index: number): Key | null {
        let n = 0;
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (!key || !this.regex.test(key)) {
                continue;
            }
            n++;
            if (n === index) {
                return key.substring(this.namespace.length) as Key;
            }
        }
        return null;
    }

    isExpire(key: Key): boolean {
        const meta = this.lookup(key);
        return meta == null || isExpire(meta.expire);
    }

    hasKey(key: Key): boolean {
        return !this.isExpire(key);
    }

    getItem(key: Key): Data[Key] | null {
        const meta = this.lookup(key);
        return meta?.value ?? null;
    }

    setItem(key: Key, value: Data[Key], expire: number | null = null): void {
        if (expire != null) expire += Date.now();
        const data: StoreItem<Data[Key]> = { value, expire };
        const stringify: string = JSON.stringify(data);
        this.storage.setItem(this.namespace + (key as string), stringify);
    }

    removeItem(key: Key): void {
        this.storage.removeItem(this.namespace + (key as string));
    }

    clear(): void {
        const keys: string[] = [];
        for (let i = 0; i < this.storage.length; i++) {
            const _key = this.storage.key(i);
            if (!_key || !this.regex.test(_key)) {
                continue;
            }
            if (_key.startsWith(this.namespace)) {
                keys.push(_key);
            }
        }
        for (const key of keys) {
            this.storage.removeItem(key);
        }
    }
}
