export const serialize = (p: { serialize: any }) => p.serialize()
export const nextTick = (p: { nextTick: any }) => p.nextTick

export const ignore = (event: { preventDefault: () => void }) => {
  event.preventDefault()
}
