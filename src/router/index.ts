import { createRouter, createWebHistory } from "vue-router";
import configRoutes from "./modules";

const routes = configRoutes;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: "is-active",
  routes,
});

export default router;
