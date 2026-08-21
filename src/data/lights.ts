import { getCollection, type CollectionEntry } from "astro:content";

export type Room = CollectionEntry<"lights">["data"]["room"]

export interface LightForCard {
  host: string
  name: string
  room: Room
  area: string
  url: string
  order: number
}

export async function getLightsForCard(): Promise<LightForCard[]> {
  const lights = await getCollection("lights")

  return lights.map((light) => ({
    host: light.data.host,
    name: light.data.name,
    room: light.data.room,
    area: light.data.area,
    url: `http://${light.data.host}`,
    order: light.data.order
  }))
}