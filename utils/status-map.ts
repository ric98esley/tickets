import type { Status, StatusResponse } from "~/types/status";

export const statusMapper = (data: StatusResponse ) : Status => {
  return {
    id: data.id,
    name: data.name,
    color: data.color,
    updated: data.updated,
    created: data.created
  }
}
