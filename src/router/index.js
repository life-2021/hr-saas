// 路由-相关模块
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout/index.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页" },
      },
      {
        path: "userIfon",
        name: "UserIfon",
        component: () => import("@/views/dashboard/modules/userInfo.vue"),
        meta: { title: "用户信息设置" },
      },
      {
        path: "departments",
        name: "Departments",
        component: () => import("@/views/departments/index"),
        meta: { title: "组织架构" },
      },
      {
        path: "employees",
        name: "Employees",
        component: () => import("@/views/employees/index"),
        meta: { title: "员工" },
      },
      {
        path:'detail',    
        component: () => import("@/views/employees/detail"),
        meta: { title: "员工详情" },
      },
      {
        path:"import", 
        component: () => import("@/views/import"),
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("@/views/setting/index"),
        meta: { title: "公司设置" },
      },
      {
        path: "salarys",
        name: "Salarys",
        component: () => import("@/views/salarys/index"),
        meta: { title: "工资" },
      },
      {
        path: "social",
        name: "Social",
        component: () => import("@/views/social/index"),
        meta: { title: "社保" },
      },
      {
        path: "historicalArchiving",
        name: "HistoricalArchiving",
        component: () => import("@/views/social/childPage/historicalArchiving"),
        meta: { title: "社保-历史档案" },
      },
      {
        path: "monthTable",
        name: "MonthTable",
        component: () => import("@/views/social/childPage/monthTable"),
        meta: { title: "社保-月度报表" },
      },
      {
        path: "socialDetail",
        name: "SocialDetail",
        component: () => import("@/views/social/childPage/socialDetail"),
        meta: { title: "社保-个人详情" },
      },
      {
        path: "attendances",
        name: "Attendances",
        component: () => import("@/views/attendances/index"),
        meta: { title: "考勤" },
      },
      {
        path: "approvals",
        name: "Approvals",
        component: () => import("@/views/approvals/index"),
        meta: { title: "审批" },
      },
      {
        path: "process",
        name: "Process",
        component: () => import("@/views/approvals/modules/processSet"),
        meta: { title: "审批流程" },
      },
      {
        path: "processDetail",
        name: "ProcessDetail",
        component: () => import("@/views/approvals/modules/processDetail"),
        meta: { title: "审批详情" },
      },
      {
        path: "permission",
        name: "Permission",
        component: () => import("@/views/permission/index"),
        meta: { title: "权限管理" },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
