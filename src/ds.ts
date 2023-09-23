export type ISwitch = {
  label: string
}

export type ISelects<T extends string> = ISwitch & {
  values: {
    value: T
    desc?: string
  }[]
}

export type IBearStore<T extends any> = {
  value: T
  setValue: (v: T) => void
}
