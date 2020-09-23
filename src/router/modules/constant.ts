import { RouteRecordRaw } from "vue-router";

export const Home: RouteRecordRaw = {
  name: "Home",
  path: "/",
  component: () => import("@/views/Home"),
};

export const About: RouteRecordRaw = {
  name: "About",
  path: "/about",
  component: () => import("@/views/About"),
};

const constantRoutes = [Home, About];

export default constantRoutes;
