import type { User, UserResponse } from "~/types/user";

export const userMapper = (data: UserResponse): User => {
  const { pocketBaseURL } = useAppConfig()
  let role = undefined

  if(data.expand?.role) role = roleMapper(data.expand.role)

  return {
    id: data.id,
    username: data.username,
    name: data.name,
    role: role,
    avatar: data.avatar
      ? `${pocketBaseURL}/api/files/${data.collectionName}/${data.id}/${data.avatar}`
      : `https://avatar.iran.liara.run/username?username=${data.username}&size=64`,
    created: data.created,
    email: data.email,
    updated: data.updated,
    verified: data.verified,
  };
}