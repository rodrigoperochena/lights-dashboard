import { getCollection, type CollectionEntry } from "astro:content";

export type Room = CollectionEntry<"lights">["data"]["room"]
export type Area = CollectionEntry<"lights">["data"]["area"]

export interface Light {
  id: string
  host: string
  name: string
  room: Room
  area: Area
  url: string
  order: number
  mdns: string
}

export async function getLights(): Promise<Light[]> {
  const lights = await getCollection("lights")

  return lights.map((light) => ({
    id: light.id,
    host: light.data.host,
    name: light.data.name,
    room: light.data.room,
    area: light.data.area,
    url: `http://${light.data.host}`,
    order: light.data.order,
    mdns: light.data.mdns
  }))
}
export function selectLightsForArea(
  lights: readonly Light[],
  room: Room,
  area: Area,
): Light[] {
  return lights.filter((light) => light.room === room && light.area === area).toSorted((a, b) => a.order - b.order)
}