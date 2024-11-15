

const routes = [
    {
        path: "/productManage",
        name: 'productManage',
        meta: {
            name: "产品制作",
        },
        component: () => import("@/views/productManage/index.vue"),
    }
]

export default routes