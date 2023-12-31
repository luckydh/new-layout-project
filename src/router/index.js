import Vue from 'vue'
import VueRouter from 'vue-router'
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    // scrollBehavior: () => ({ y: 0 }),
    routes
})

// router.beforeEach((to, from, next) => {
//     NProgress.start();
//     next();
// });

// router.afterEach((to, from) => {
//     NProgress.done();
// });

export default router
