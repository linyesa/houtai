import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import LoginTo from "../components/LoginTo"
import HelloWorld from "../components/HelloWorld";
import index from "../components/index"
import son from "../components/son"
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

]

var router =  new VueRouter({
    routes
})
export default router;