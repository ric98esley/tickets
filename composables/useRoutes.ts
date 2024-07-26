import type { RouteResponse, Route } from "~/types";

export const useFindRoutes = async (): Promise<{ total: number, rows: Route[] }> => {
  try {
    const { $pb } = useNuxtApp();
    const routes = await $pb.collection<RouteResponse>('routes').getList(1, 0, {
      sort: '-created',
      expand: 'assignedTo,createdBy,tickets,tickets.assignedTo,tickets.createdBy'
    });

    return {
      total: routes.totalItems,
      rows: routes.items.map(routeMapper)
    }

  } catch (error) {
    console.error(error);
    return { total: 0, rows: [] }
  }
};