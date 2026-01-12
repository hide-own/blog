interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module "*.vue" {
    import type {DefineComponent} from "vue";

    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, never>;
    export default component;
}

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production";
        readonly VITE_DEV_SERVER_HOST: string;
        readonly VITE_DEV_SERVER_PORT: string;
    }
}

// 扩展 Vite 的 ImportMetaEnv 类型，而不是重新定义
interface ImportMetaEnv {
    readonly VITE_ENV: string; // 环境
    readonly VITE_OUTPUT_DIR: string; // 打包目录
}

interface Window {
    showLoading: () => void;
    hideLoading: () => void;
}

interface GlobalData {
    loginResult: boolean;
    [key: string]: unknown;
}

type GlobalKey = keyof GlobalData;