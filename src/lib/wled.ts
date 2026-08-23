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

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function waitForWledPreset(
  host: string,
  presetId: number,
): Promise<WledState> {
  const attempts = 10
  const interval = 50

  for (let attempt = 0; attempt < attempts; attempt++) {
    const state = await getWledState(host)

    if (state.ps === presetId) {
      return state
    }
    
    if (attempt < attempts - 1) {
      await delay(interval)
    }
  }

  throw new Error(
    `Preset ${presetId} did not apply on ${host}`,
  )
}

export async function setWledPreset(
  host: string,
  presetId: number
): Promise<WledState> {
  await updateWledState(host, {
    ps: presetId
  })

  return waitForWledPreset(host, presetId)
}

const WLED_REQUEST_TIMEOUT = 2_000

async function requestWledJson<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(WLED_REQUEST_TIMEOUT)
  })

  if (!response.ok) {
    throw new Error(`WLED request to ${url} failed with ${response.status}`)
  }

  return response.json() as Promise<T>
}

function getStateUrl(host: string) {
  return `http://${host}/json/state`;
}

function getPresetsUrl(host: string) {
  return `http://${host}/presets.json`
}

async function requestState(
  host: string,
  options?: RequestInit,
): Promise<WledState> {
  return requestWledJson<WledState>(
    getStateUrl(host),
    options
  )
}

export function getWledState(host: string) {
  return requestState(host);
}

export async function getWledPresets(
  host: string,
): Promise<WledPreset[]> {
  const data = await requestWledJson<Record<string, WledPresetData>>(getPresetsUrl(host))

  return Object.entries(data).flatMap(([id, preset]) => {
    if (!preset.n) return []

    return [{
      id: Number(id),
      name: preset.n
    }]
  }).sort((a, b) => a.id - b.id)
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