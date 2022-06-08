interface ImportMeta {
    readonly env: ImportMetaEnv;
}
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    // eslint-disable-next-line @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, never>;
    export default component;
}

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production";
        readonly VITE_DEV_SERVER_HOST: string;
        readonly VITE_DEV_SERVER_PORT: string;
    }
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_ENV: string; // 环境
    readonly VITE_OUTPUT_DIR: string; // 打包目录
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
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
