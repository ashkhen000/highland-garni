import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    getScrollRestorationKey: (location) => location.pathname,
    scrollRestorationBehavior: "instant",
    defaultPreloadStaleTime: 0,
  });

  if (typeof window !== "undefined") {
    router.subscribe("onResolved", () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    });
  }

  return router;
};
