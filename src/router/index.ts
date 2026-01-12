import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		meta: {
			title: "首页",
			keepAlive: true
		},
		component: () => import("@/page/home/index.vue")
	}
]

const router = createRouter({
	history: createWebHashHistory("/"),
	routes
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title as string //设置网页标题
	next()
})

export default router
