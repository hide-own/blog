import {defineStore} from "pinia";

export interface userState {
    token: string | null;
}
export const user = defineStore("user", {
    state: (): userState => {
        return {
            token: null,
        };
    },
    getters: {},

    actions: {
        modifyToken(data: string | null) {
            this.token = data;
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "token",
                storage: localStorage,
                paths: ["token"],
            },
        ],
    },
});
