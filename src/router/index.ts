import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        meta: {
            title: "首页",
        },
        component: () => import("@/page/home/index.vue"),
    },
    {
            path: "/login",
        name: "Login",
        meta: {
            title: "登录",
        },
        component: () => import("@/page/LoginPage.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory("/"),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string; //设置网页标题
    next();
});

export default router;
