import type { WledState } from "@/lib/wled"

type WledStateListener = (
  host: string,
  state: WledState | undefined
) => void

const states = new Map<string, WledState>()
const listeners = new Set<WledStateListener>()

export function updateKnownWledState(
  host: string,
  state: WledState,
) {
  states.set(host, state)

  for (const listener of listeners) {
    listener(host, state)
  }
}

export function getKnownWledState(
  host: string,
) {
  return states.get(host)
}

export function subscribeToWledState(
  listener: WledStateListener,
) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function clearKnownWledState(host: string) {
  states.delete(host)

  for (const listener of listeners) {
    listener(host, undefined)
  }
}