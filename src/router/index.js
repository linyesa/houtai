import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import LoginTo from "../components/LoginTo"
import HelloWorld from "../components/HelloWorld";
import index from "../components/index"
import son from "../components/son"
import SystemAdmin from "../components/SystemAdmin";
import ScenicSpot from "../components/ScenicSpot";
import ScenicSpotAdd from "../components/ScenicSpotAdd";
import ScenicSpotManager from "../components/ScenicSpotManager";
import LineAdd from "../components/LineAdd";
import Line from "../components/Line";
import LineManager from "../components/LineManager";
import OrderAdd from "../components/OrderAdd";
import Order from "../components/Order";
import OrderManager from "../components/OrderManager";
import UserManager from "../components/UserManager";
import DataChart from "../components/DataChart";
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/loginto",
        component: LoginTo
    },
    {
        path:"/hello",
        component: HelloWorld
    },
    {
        path:"/",
        component: index,
        children: [
            {
                // 当 /user/:id/profile 匹配成功
                // UserProfile 将被渲染到 User 的 <router-view> 内部
                path: 'son',
                component: son
            }],
    },
    {
        path:"/admin",
        component: SystemAdmin,
        redirect:'/admin/datachart',
        children:[
            {
                path:'scenicspot',
                component: ScenicSpot

            },
            {
                path:"scenicspotadd",
                component: ScenicSpotAdd
            },
            {
                path:"scenicspotmanager",
                component: ScenicSpotManager
            },
            {
                path:"lineadd",
                component: LineAdd
            },
            {
                path:'line',
                component: Line
            },
            {
                path:'linemanager',
                component: LineManager
            },
            {
                path:'orderadd',
                component: OrderAdd
            },
            {
                path:'order',
                component: Order
            },
            {
                path:'ordermanager',
                component: OrderManager
            },
            {
                path:'usermanager',
                component: UserManager
            },
            {
                path:"datachart",
                component: DataChart
            }
        ],
    }

]

var router =  new VueRouter({
    routes
})
export default router;