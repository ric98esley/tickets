import type { Status, StatusResponse } from "~/types/status";

export const statusMapper = (data: StatusResponse ) : Status => {
  return {
    id: data.id ?? 'sin-id',
    name: data.name ?? 'Sin status',
    color: data.color,
    updated: data.updated,
    created: data.created
  }
}
