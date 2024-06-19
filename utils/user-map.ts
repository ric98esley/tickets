import type { User, UserResponse } from "~/types/user";

export const userMapper = (data: UserResponse): User => {
  return {
    id: data.id,
    username: data.username,
    name: data.name,
    role: data.role,
    avatar: data.avatar,
    created: data.created,
    email: data.email,
    updated: data.updated,
    verified: data.verified,
  };
}