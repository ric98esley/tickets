import type { Role, RoleResponse } from "~/types/user";

export const roleMapper = (data: RoleResponse): Role => {
  return {
    id: data.id,
    name: data.name,
    created: data.created,
    updated: data.updated,
    abilities: data.expand?.abilities
  };
}
