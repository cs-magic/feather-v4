import { create, StateCreator } from "zustand"

// 不要用lodash的capitalize，因为它会把其他字符都变小写
export const capitalize = (s: string) => s[0].toUpperCase() + s.substring(1)

export type BearSlice<K extends string, V extends any> = {
  [P in K]: V
} & {
  [P in `set${Capitalize<K>}`]: (v: V) => void
}

const createBearSlice =
  <K extends string, V extends any>(
    k: K,
    defaultValue: V
  ): StateCreator<
    BearSlice<K, V>,
    //todo: persist
    [],
    [],
    BearSlice<K, V>
  > =>
  (set) => {
    return {
      [k]: defaultValue,
      [`set${capitalize(k)}`]: (v: V) =>
        set({ [k]: v } as Partial<BearSlice<K, V>>),
    } as BearSlice<K, V>
  }

export const useBearStore =
  <V extends any>() =>
  <K extends string>(k: K, defaultValue: V) =>
    create<BearSlice<K, V>>()((...a) => ({
      ...createBearSlice<K, V>(k, defaultValue)(...a),
    }))
