import type { Department, DepartmentResponse, FindDepartment } from "~/types";

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

export const useFindOneDepartment = async (id: string): Promise<Department | null> => {
  try {
    const { $pb } = useNuxtApp();
    const department = await $pb.collection<DepartmentResponse>('departments').getOne(id);
    return departmentMapper(department);
  } catch (error) {
    console.error(error);
    return null;
  }
}