import type { Department, DepartmentResponse } from "~/types";

export const departmentMapper = (data: DepartmentResponse): Department => {
  return {
    id: data.id,
    name: data.name,
    createdAt: data.created,
    updatedAt: data.updated
  };
}