import type { Zone, ZoneCreate, ZoneResponse } from "~/types/zones"

interface FindZones {
  rows: Zone[],
  total: number
}

export const useFindZones = async (): Promise<FindZones> => {
  try {
    const { $pb } = useNuxtApp()
    const zones = await $pb.collection<ZoneResponse>('zones').getList(1, 200)

    return {
      rows: zones.items.map(zoneMapper),
      total: zones.totalItems
    }
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error al cargar las zonas intenta de nuevo',
      color: 'red',
    })
    return {
      rows: [],
      total: 0
    }
  }
}

export const useCreateZone = async (zone: ZoneCreate): Promise<Zone | null> => {
  try {
    const { $pb } = useNuxtApp()
    const newZone = await $pb.collection<ZoneResponse>('zones').create(zone)
    return zoneMapper(newZone)
  } catch (error) {
    console.log(error)
    const toast = useToast()
    toast.add({
      title: 'Error al crear la zona intenta de nuevo',
      color: 'red',
    })

    return null
  }
}

export const useUpdateZone = async (id: string, zone: ZoneCreate): Promise<Zone | null> => {
  try {
    const { $pb } = useNuxtApp()
    const updatedZone = await $pb.collection<ZoneResponse>('zones').update(id, zone)
    return zoneMapper(updatedZone)
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error al actualizar la zona intenta de nuevo',
      color: 'red',
    })
    return null
  }
}

export const useFindOneZone = async (id: string): Promise<Zone | null> => {
  try {
    const { $pb } = useNuxtApp()
    const zone = await $pb.collection<ZoneResponse>('zones').getOne(id)
    return zoneMapper(zone)
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error al cargar la zona intenta de nuevo',
      color: 'red',
    })
    return null
  }
}

export const useDeleteZone = async (id: string): Promise<boolean> => {
  try {
    const { $pb } = useNuxtApp()
    await $pb.collection<ZoneResponse>('zones').delete(id)
    return true
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error al eliminar la zona intenta de nuevo',
      color: 'red',
    })
    return false
  }
}