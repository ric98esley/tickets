import type { Zone, ZoneResponse } from "~/types/zones";

export const zoneMapper = (data: ZoneResponse): Zone => {
  return {
    id: data.id,
    name: data.name,
    created: data.created,
    updated: data.updated
  };
}