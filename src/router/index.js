import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
// Views
const Dashboard = () => import('@/views/Dashboard')
// Views - Pages
const Page404 = () => import('@/views/user/Page404')
const Page500 = () => import('@/views/user/Page500')
const Login = () => import('@/views/user/Login')
const Register = () => import('@/views/user/Register')
const Welcome = () => import('@/views/home/Welcome')
const EditProfile = () => import('@/views/user/userEdit')
const forgetPassword = () => import('@/views/user/forgetPassword')
const resetPassword = () => import('@/views/user/resetPassword')
const Create = () => import('@/views/Cms/Create')
const index = () => import('@/views/Cms/index')
const Update = () => import('@/views/Cms/Update')
const Details = () => import('@/views/DetailFood/Details')
const typeOfFood = () => import('@/views/PageTypeFood/typeOfFood')
const UserFood = () => import('@/views/UserFood/pageUserFood')
const Menu = () => import('@/views/DetailFood/Menu')
const MenuUserFood = () => import('@/views/UserFood/Menu')
const SearchMenu = () => import('@/views/Search/SearchMenu')
const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'หน้าแรก',
            redirect: '/welcome',
            component: DefaultContainer,
            children: [
                {
                    path: 'dashboard',
                    name: 'แนะนำเมนูอาหาร',
                    meta: { requiresAuth: true },
                    component: Dashboard
                },
                {
                    path: 'welcome',
                    name: 'Welcome',
                    component: Welcome
                },
                {
                    path:'details',
                    name: 'เมนูอาหาร',
                    component: Details
                },
                {
                    path:'profile',
                    name: 'โปรไฟล์',
                    meta: { requiresProfile: true },
                    component: EditProfile
                },
                {
                    path:'typeoffood',
                    name: 'ประเภทของอาหาร',
                    meta: {requiresAuth: true},
                    component: typeOfFood
                },
                {
                    path:'menu',
                    name: 'เมนู',
                    meta: {requiresAuth: true},
                    component: Menu
                },
                {
                    path:'searchmenu',
                    name: 'ค้นหาเมนู',
                    meta: {requiresAuth: true},
                    component: SearchMenu
                },
                {
                    path: 'community',
                    redirect : 'community/userfood',
                    name: 'ชุมชนอาหาร',
                    meta: { requiresAuth: true },
                    component: {
                        render (c) { return c('router-view') }
                      },
                    children: [
                        {
                            path:'userfood',
                            name: 'ชุมชนอาหารหลัก',
                            meta: {requiresAuth: true},
                            component: UserFood
                        },
                        {
                            path:'menu',
                            name: 'เมนูอาหารสมาชิก',
                            meta: {requiresAuth: true},
                            component: MenuUserFood
                        },
                    ]
                },
                {
                    path: 'cms',
                    redirect: '/cms/index',
                    name: 'สร้างเมนูอาหาร',
                    meta: { requiresAuth: true },
                    component: {
                      render (c) { return c('router-view') }
                    },
                    children: [
                      {
                        path: 'create',
                        name: 'เลือกรายการวัตถุดิบอาหาร',
                        component: Create
                      },
                      {
                        path: 'index',
                        name: 'ตารางอาหารของฉัน',
                        component: index
                      },
                      {
                        path: 'CmsUpdate',
                        name: 'แก้ไขเมนูอาหาร',
                        component: Update
                      }
                    ]
                },
            ]
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            meta: { signIn: true },
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: '404',
                    name: 'Page404',    
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'signin',
                    name: 'SignIn',
                    component: Login
                },
                {
                    path: 'signup',
                    name: 'SignUp',
                    component: Register
                },
                {
                    path: 'resetpassword',
                    name: 'resetPassword',
                    component: resetPassword
                },
                {
                    path: 'forgetpassword',
                    name: 'forgetPassword',
                    component: forgetPassword
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['user/token']) {
            next()
            return
        }
        next('/pages/signin')
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresProfile)) {
        if (store.getters['user/stat'] === true) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.signIn)) {
        if (!store.getters['user/token']) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})
export default router
