import type { Group, GroupResponse } from "~/types/groups";

export const groupMapper = (group: GroupResponse) : Group => {
  const user = group.expand?.manager ? userMapper(group.expand?.manager) : undefined;

  return {
    id: group.id,
    name: group.name,
    code: group.code,
    phone: group.phone,
    manager: user,
    created: group.created,
    updated: group.updated
  }
}
