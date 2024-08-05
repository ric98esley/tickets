import type { RouteResponse, Route, RouteCreate, RouteUpdate } from "~/types";

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

export const useFindOneRoute = async (id: string): Promise<Route | undefined> => {
  try {
    const { $pb } = useNuxtApp();
    const route = await $pb.collection<RouteResponse>('routes').getOne(id, {
      expand: 'assignedTo,createdBy'
    });

    return routeMapper(route);

  } catch (error) {
    console.error(error);
    return undefined;
  }
}

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

export const useUpdateRoute = async (id: string, data: RouteUpdate): Promise<Route | null> => {
  const toast = useToast();
  try {
    const { $pb } = useNuxtApp();
    const route = await $pb.collection<RouteResponse>('routes').update(id, data, {
      expand: 'assignedTo,createdBy'
    });

    toast.add({
      title: 'Ruta actualizada',
      description: 'La ruta se ha actualizado correctamente',
    })

    return routeMapper(route);

  } catch (error) {
    console.error(error);
    toast.add({
      title: 'Error al actualizar la ruta',
      description: 'Intenta de nuevo',
      color: 'red'
    })
    return null;
  }
}