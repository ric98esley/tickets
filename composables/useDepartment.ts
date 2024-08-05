import type { Department, DepartmentResponse, FindDepartment } from "~/types";

export const useFindDepartments = async (data: FindDepartment): Promise<{ total: number, rows: Department[] }> => {
  try {
    const { $pb } = useNuxtApp();
    const departments = await $pb.collection<DepartmentResponse>('departments').getList(data.page ?? 1, data.limit ?? 10, {
      sort: '-created',
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