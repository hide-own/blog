export interface ChangeEmitter<Data = unknown> {
    emit(data: Data): void;
    listen(onData: ValueChanged<Data>): VoidCallback;
    wait(duration?: number): Promise<Data>;
}

export function createChangeEmitter<Data = unknown>(): ChangeEmitter<Data> {
    const listeners: ValueChanged<Data>[] = [];

    function emit(data: Data): void {
        const _listeners = listeners.slice(0);
        for (const listener of _listeners) {
            listener(data);
        }
    }

    function listen(onData: ValueChanged<Data>): VoidCallback {
        listeners.push(onData);
        return () => {
            let i = 0;
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const index = listeners.indexOf(onData, i);
                if (index === -1) return;
                listeners.splice(index, 1);
                i = index;
            }
        };
    }

    function wait(duration = 0): Promise<Data> {
        return new Promise<Data>((resolve, reject): void => {
            let timeout = false;
            let timer: NodeJS.Timer | null = null;
            if (duration > 0) {
                timer = setTimeout((): void => {
                    timer = null;
                    timeout = true;
                    reject(new Error("timeout"));
                }, duration);
            }
            const stop = listen((data: Data) => {
                if (timer != null) {
                    clearTimeout(timer);
                    timer = null;
                }
                if (!timeout) {
                    resolve(data);
                }
                stop();
            });
        });
    }

    return { emit, listen, wait };
}

export type Events<D extends Record<string, unknown>> = {
    [P in keyof D]?: ChangeEmitter<D[P]>;
};

const events: Events<GlobalData> = Object.create(null);

export function listen<Key extends GlobalKey>(
    type: Key,
    onData: ValueChanged<GlobalData[Key]>
): VoidCallback {
    if (!(type in events)) {
        events[type] = createChangeEmitter();
    }
    return events[type]!.listen(onData);
}

export function emit<Key extends GlobalKey>(
    type: Key,
    data: GlobalData[Key]
): void {
    events[type]?.emit(data);
}

export function wait<Key extends GlobalKey>(
    type: Key,
    duration?: number
): Promise<GlobalData[Key]> {
    if (!(type in events)) {
        events[type] = createChangeEmitter();
    }
    return events[type]!.wait(duration ?? 0);
}
