

const routes = {
    // 首页导航
    home:{
        menuDisabled: false, // 是否开启测导航
        path: '/home',
        name: 'mapHome',
        component: () => import('@/views/home/home'),
        children: [
        ],
    },
    // 数据管理
    dataManage:{
        menuDisabled: true,  // 是否开启测导航
        children:[
            {name: '导航一', idIndex: '1', icon: 'el-icon-menu', disabled: false,  path: ''},
            {name: '导航二', idIndex: '2', icon: 'el-icon-document', disabled: false,  path: ''},
            {name: '导航三', idIndex: '3', icon: 'el-icon-setting', disabled: false,  path: ''},
        ]
    },
    // 数据监控
    dataMonitor:{
        menuDisabled: true,  // 是否开启测导航
        // path: '/dataMonitor',
        // name: 'dataMonitor',
        // component: () => import('@/views/dataMonitor/dataMonitor'),
        children: [
        ],
    },
    // 系统配置
    systemAllocation:{
        menuDisabled: true,
        children:[
            // {
            //     name: '站点管理', 
            //     idIndex: '1', 
            //     icon: 'icon-zhandian', 
            //     disabled: false,  
            //     path: '/siteManage', 
            //     pathName: 'siteManage',  
            //     component: () => import('@/views/systemAllocation/siteManage'), 
            // },
            {name: '导航一', idIndex: '1', icon: 'el-icon-menu', disabled: false,  path: ''},
            {name: '导航二', idIndex: '2', icon: 'el-icon-document', disabled: false,  path: ''},
            {name: '导航三', idIndex: '3', icon: 'el-icon-setting', disabled: false,  path: ''},
        ]
    },

}

export default routes