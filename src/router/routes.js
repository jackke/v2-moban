

const routes = [
    {
        path: "/dutyManage",
        name: 'dutyManage',
        meta: {
            name: "值班管理",
        },
        component: () => import("@/views/dutyManage/index.vue"),
    },
    {
        path: "/dutyInfo",
        name: 'dutyInfo',
        meta: {
            name: "值班信息",
        },
        component: () => import("@/views/dutyInfo/index.vue"),
    },
    {
        path: "/userDuty",
        name: 'userDuty',
        meta: {
            name: "值班信息",
        },
        component: () => import("@/views/userDuty/index.vue"),
    },
    {
        path: "/userManage",
        name: 'userManage',
        meta: {
            name: "人员管理",
        },
        component: () => import("@/views/userManage/index.vue"),
    },
]

export default routes