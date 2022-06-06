import { defineStore } from "pinia";

export const user = defineStore("user", {
  state: () => {
    return {
      token: "",
      menuKey: ["Size"],
      aSmallScreen: false,
    };
  },
  getters: {},
  actions: {
    modifyToken(data: string) {
      this.token = data;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "token",
        storage: sessionStorage,
        paths: ["token"],
      },
    ],
  },
});
