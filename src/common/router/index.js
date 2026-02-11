import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '~/pages/NotFound.vue';
import Transactions from '~/pages/Transactions.vue';
import Wallet from '~/pages/Wallet.vue';

const routes = [
    {
        path: '/',
        redirect: '/wallet',
    },
    {
        path: '/wallet',
        name: 'wallet',
        component: Wallet,
        meta: {
            title: 'Wallet',
        },
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: Transactions,
        meta: {
            title: 'Transactions',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: NotFound,
        meta: {
            title: 'NotFound',
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;