import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    router: [
        {
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
})

export default router
