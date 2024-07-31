import type { RouteResponse, Route, RouteCreate } from "~/types";

export const useFindRoutes = async (): Promise<{ total: number, rows: Route[] }> => {
  try {
    const { $pb } = useNuxtApp();
    const routes = await $pb.collection<RouteResponse>('routes').getList(1, 0, {
      sort: '-created',
      expand: 'assignedTo,createdBy'
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

export const useCreateRoute = async (data: RouteCreate): Promise<Route | null> => {
  const toast = useToast();
  try {
    const { $pb } = useNuxtApp();
    const userStore = useUserStore()

    const route = await $pb.collection<RouteResponse>('routes')
      .create({
        ...data,
        createdBy: userStore.user?.id
      }, {
        expand: 'assignedTo,createdBy'
      });


    toast.add({
      title: 'Ruta creada',
      description: 'La ruta se ha creado correctamente',
    })

    return routeMapper(route);

  } catch (error) {
    console.error(error);
    toast.add({
      title: 'Error al crear la ruta',
      description: 'Intenta de nuevo',
      color: 'red'
    })
    return null;
  }
};