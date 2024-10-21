import type { Department, DepartmentCreate, DepartmentResponse, FindDepartment } from "~/types";

export const useFindDepartments = async (data: FindDepartment): Promise<{ total: number, rows: Department[] }> => {
  try {
    let filter = ''
    if(data.name) filter = constructQuery(filter, `name~"${data.name}"`);
    const { $pb } = useNuxtApp();
    const departments = await $pb.collection<DepartmentResponse>('departments').getList(data.page ?? 1, data.limit ?? 10, {
      sort: '-created',
      filter
    });

    return {
      total: departments.totalItems,
      rows: departments.items.map(departmentMapper)
    }
  } catch (error) {
    console.error(error);
    return { total: 0, rows: [] }
  }
}

export const useFindOneDepartment = async (id: string): Promise<Department | undefined> => {
  try {
    const { $pb } = useNuxtApp();
    const department = await $pb.collection<DepartmentResponse>('departments').getOne(id);
    return departmentMapper(department);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const useCreateDepartment = async (data: DepartmentCreate): Promise<Department | undefined> => {
  try {
    const { $pb } = useNuxtApp();
    const department = await $pb.collection<DepartmentResponse>('departments').create(data);
    return departmentMapper(department);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const useUpdateDepartment = async (id: string, data: DepartmentCreate): Promise<Department | undefined> => {
  try {
    const { $pb } = useNuxtApp();
    const department = await $pb.collection<DepartmentResponse>('departments').update(id, data);
    return departmentMapper(department);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const useDeleteDepartment = async (id: string): Promise<boolean> => {
  try {
    const { $pb } = useNuxtApp();
    await $pb.collection<DepartmentResponse>('departments').delete(id);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}