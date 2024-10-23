import type { Group, GroupCreate, GroupResponse } from "~/types/groups";

interface FindGroup {
  limit?: number;
  page?: number;
  query?: string;
}

const expand = 'manager';

export const useFindGroup = async (data: FindGroup) => {
  try {
    const filter = data.query ? `name~"${data.query}" || code~"${data.query}"` : '';
    const { $pb } = useNuxtApp();
    const res = await $pb.collection<GroupResponse>('groups').getList(data.page ?? 1, data.limit ?? 10, {
      sort: '-created',
      filter,
      expand
    });

    return {
      rows: res.items.map((item) => groupMapper(item)),
      total: res.totalItems,
    }
  } catch (error: any) {
    return {
      rows: [],
      total: 0,
    }
  }
}

export const useFindOneGroup = async (id: string): Promise<Group | undefined> => {
  try {
    const { $pb } = useNuxtApp();
    const res = await $pb.collection<GroupResponse>('groups').getOne(id, {
      expand
    });

    return groupMapper(res);
  } catch (error) {
    return undefined;
  }
}

export const useCreateGroup = async (data: GroupCreate): Promise<Group | undefined> => {
  try {
    const { $pb } = useNuxtApp();

    const res = await $pb.collection<GroupResponse>('groups').create(data, {
      expand
    });

    return groupMapper(res);
  } catch (error) {
    return undefined
  }
}

export const useUpdateGroup = async (id: string, data: GroupCreate): Promise<Group | undefined> => {
  try {
    const { $pb } = useNuxtApp();

    const res = await $pb.collection<GroupResponse>('groups').update(id, data, {
      expand
    });

    return groupMapper(res);
  } catch (error) {
    return undefined
  }
}

export const useDeleteGroup = async (id: string): Promise<boolean> => {
  try {
    const { $pb } = useNuxtApp();
    await $pb.collection<GroupResponse>('groups').delete(id);

    return true;
  } catch (error) {
    return false;
  }
}