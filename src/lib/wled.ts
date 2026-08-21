export type WledColor = [number, number, number]

export interface WledPreset {
  id: number
  name: string
}

export interface WledSegment {
  id?: number
  col: WledColor[]
  fx: number
}

export interface WledState {
  on: boolean
  bri: number
  ps: number
  mainseg: number
  seg: WledSegment[]
}

type WledStateUpdate = {
  on?: boolean | "t"
  bri?: number
  ps?: number
}

type WledPresetData = {
  n?: string
}

function getStateUrl(host: string) {
  return `http://${host}/json/state`;
}

async function requestState(
  host: string,
  options?: RequestInit,
): Promise<WledState> {
  const response = await fetch(getStateUrl(host), options);

  if (!response.ok) {
    throw new Error(
      `WLED request to ${host} failed with ${response.status}`,
    );
  }

  return response.json();
}

export function getWledState(host: string) {
  return requestState(host);
}

export async function getWledPresets(host: string): Promise<WledPreset[]> {
  const response = await fetch(`http://${host}/presets.json`)

  if (!response.ok) {
    throw new Error(`Failed to get presets from ${host}: ${response.status}`)
  }

  const data: Record<string, WledPresetData> = await response.json()

  return Object.entries(data).filter(([, preset]) => preset.n).map(([id, preset]) => ({
    id: Number(id),
    name: preset.n!
  })).sort((a, b) => a.id - b.id)
}

async function updateWledState(
  host: string,
  update: WledStateUpdate,
) {
  return requestState(host, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...update,
      v: true,
    }),
  });
}

export function toggleWledPower(host: string) {
  return updateWledState(host, {
    on: "t",
  });
}

export function setWledPower(
  host: string,
  on: boolean
) {
  return updateWledState(host, { on })
}

export function setWledBrightness(
  host: string,
  brightness: number,
) {
  return updateWledState(host, {
    bri: brightness,
  });
}

export async function setWledPreset(
  host: string,
  presetId: number
) {
  await updateWledState(host, {
    ps: presetId
  })

  return getWledState(host)
}