import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import EulaView from "../views/EulaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/eula",
      name: "eula",
      component: EulaView,
    },
  ],
});

export default router;
