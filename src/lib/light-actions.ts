import { setWledPower } from "./wled"
import { updateKnownWledState } from "./wled-state"

export function setLightsPower(
  hosts: readonly string[],
  on: boolean
) {
  return Promise.allSettled(
    hosts.map(async (host) => {
      const state = await setWledPower(host, on)

      updateKnownWledState(host, state)

      return { host, state }
    })
  )
}