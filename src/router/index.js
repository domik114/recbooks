import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/app",
        name: "LoggedIn",
        component: () => import("../App.vue"),
    },

    {
        path: "/",
        name: "Home",
        component: () => import("../views/NotAuthorizedView.vue"),
    },

    {
        path: "/register",
        name: "Register",
        component: () => import("../views/RegisterView.vue"),
    },

    {
        path: "/login",
        name: "Login",
        component: () => import("../views/LoginView.vue"),
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;