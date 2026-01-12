/** 常用回调函数签名。*/
interface VoidCallback {
    (): void;
}

/** 异步回调函数签名。*/
interface AsyncCallback {
    (): Promise<void>;
}

/** 赋值函数签名。*/
interface ValueSetter<T> {
    (value: T): void;
}

/** 取值函数签名。*/
interface ValueGetter<T> {
    (): T;
}

/** 异步赋值函数签名。*/
interface AsyncValueSetter<T> {
    (value: T): Promise<T>;
}

/** 异步取值函数签名。*/
interface AsyncValueGetter<T> {
    (): Promise<T>;
}

/** 值变监听器函数签名。*/
interface ValueChanged<T> {
    (value: T): void;
}

/** 要么是正常数据，要么是 Vue 的 Ref 数据。 */
type MaybeRef<T> = T extends import("vue").Ref<infer P> ? P : T;

/** 推断出来自数组成员。 */
type ElementOf<T> = T extends Array<infer E> ? E : never;

/** 可能是异步数据。*/
type Awaitable<T> = T | Promise<T>;

/** 可能是 HTML 元素或者 Vue 组件实例。 */
type MaybeElement =
    | HTMLElement
    | SVGElement
    | import("vue").ComponentPublicInstance
    | undefined
    | null;

type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>;
type WindowEventName = keyof WindowEventMap;
type DocumentEventName = keyof DocumentEventMap;

interface GeneralEventListener<E = Event> {
    (evt: E): void;
}

/** 事件过滤器函数签名 */
type EventFilter<Args extends unknown[] = unknown[], This = unknown> = (
    invoke: VoidCallback,
    options?: (...args: Args) => This,
) => void;

interface Position {
    x: number;
    y: number;
}

interface ScrollPosition {
    left: number;
    top: number;
}

interface Pausable {
    /**
     * A ref indicate whether a pusable instance is active
     */
    isActive: import("vue").Ref<boolean>;

    /**
     * Temporary pause the effect from executing
     */
    pause: VoidCallback;

    /**
     * Resume the effects
     */
    resume: VoidCallback;
}

interface Stoppable {
    /**
     * A ref indicate whether a stoppable instance is executing
     */
    isPending: import("vue").Ref<boolean>;

    /**
     * Stop the effect from executing
     */
    stop: VoidCallback;

    /**
     * Start the effects
     */
    start: VoidCallback;
}
