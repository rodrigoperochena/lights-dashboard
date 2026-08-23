import { defineCollection, reference } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const lights = defineCollection({
  loader: file("src/data/lights.json"),

  schema: z.object({
    name: z.string().trim().min(1), //no empty strings
    room: z.enum(["bedroom", "bathroom", "kitchen"]),
    host: z.string().trim().min(1),
    area: z.string().trim().min(1),
    order: z.number().int(),
  })
})

const sceneLight = z.object({
  light: reference("lights"),
  on: z.boolean().optional(),
  brightness: z.number().int().min(1).max(255).optional(),
  preset: z.string().trim().min(1).optional()
}).refine(
  ({ on, brightness, preset }) => 
    on !== undefined || 
    brightness !== undefined || 
    preset !== undefined, 
  { message: "Scene light must define at least one action" }
)

const scenes = defineCollection({
  loader: file("src/data/scenes.json"),

  schema: z.object({
    name: z.string(),
    lights: z.array(sceneLight).min(1)
  })
})

export const collections = { lights, scenes }