import {StorageProxy} from "./storage";

//保存的数据格式
interface Data extends Record<AccessTokenType, string> {
    token_type: AccessTokenType;
    token: string;

    [key: string]: unknown;
}

const sys = new StorageProxy<keyof Data, Data>(localStorage, "system:");

/**
 * 获取保存的数据
 * @param key
 * @param defaultValue
 */
export function getPersist<K extends keyof Data>(
    key: K,
    defaultValue: Data[K] | null = null,
): Data[K] | null {
    return sys.getItem(key) ?? defaultValue;
}

/**
 * 设置数据
 * @param {string} key
 * @param {*} value 设置的值
 * @param {number|null} [expire] 过期时间
 */
export function setPersist<K extends keyof Data>(
    key: K,
    value: Data[K],
    expire: number | null = null,
): void {
    sys.setItem(key, value, expire);
}

/**
 * 判断数据是否存在
 * @param {string} key
 */
export function hasPersist<K extends keyof Data>(key: K): boolean {
    return sys.hasKey(key);
}

export function isExpire<K extends keyof Data>(key: K): boolean {
    return sys.isExpire(key);
}

/**
 * 删除指定的数据
 * @param key
 */
export function removePersist<K extends keyof Data>(key: K): void {
    return sys.removeItem(key);
}

/**
 * 清空数据
 * @param {boolean} token 是否同时清理授权令牌
 */
export function clearPersist(token = false): void {
    if (token && hasPersist("token_type")) {
        const tokenType = getPersist("token_type")!;
        if (hasPersist(tokenType)) {
            const tokenValue = getPersist(tokenType)!;
            sys.clear();
            setPersist("token_type", tokenType);
            setPersist(tokenType, tokenValue);
            return;
        }
    }
    sys.clear();
}
