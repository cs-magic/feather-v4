import React, { PropsWithChildren, useState } from "react"
import {
  ControlMode,
  RenderMode,
  UILibrary,
  useBGMEnabled,
  useControlMode,
  useLabelEnabled,
  useRenderMode,
  useUILibrary,
} from "@/store"
import * as Dialog from "@radix-ui/react-dialog"
import { DialogTriggerProps } from "@radix-ui/react-dialog"
import { client } from "@/lib/game/client"
import * as Select from "@radix-ui/react-select"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { SelectItem } from "@/app/game/comp/statusbar"
import * as Switch from "@radix-ui/react-switch"
import * as Separator from "@radix-ui/react-separator"
import { CONFIG } from "@/config"
import { IBearStore, ISelects, ISwitch } from "@/ds"

const TheField = ({
  label,
  children,
}: { label: string } & PropsWithChildren) => (
  <fieldset className="mb-[15px] flex items-center gap-5">
    <label className="text-violet11 w-[90px] text-right text-[15px]">
      {label}
    </label>

    {children}
  </fieldset>
)

const SelectField = <T extends string>({
  label,
  value,
  onValueChange,
}: {
  label: string
  value: T
  onValueChange: (v: T) => void
} & PropsWithChildren) => {
  return (
    <TheField label={label}>
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
          aria-label="render mode"
        >
          <Select.Value />
          <Select.Icon className="text-violet11">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
              <ChevronUpIcon />
            </Select.ScrollUpButton>

            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <SelectItem value={"CSS"}>
                  标准模式（对设备性能要求略高）
                </SelectItem>
                <SelectItem value={"Canvas"}>Beta模式（画面更流畅）</SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </TheField>
  )
}

export const SwitchComp = ({
  label,
  setValue,
  value,
}: ISwitch & IBearStore<boolean>) => (
  <fieldset className="mb-[15px] flex items-center gap-5">
    <label className="text-violet11 w-[90px] text-right text-[15px]">
      {label}
    </label>

    <Switch.Root
      checked={value}
      onCheckedChange={setValue}
      className="w-[42px] h-[25px]  rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-primary outline-none cursor-default"
      id="airplane-mode"
    >
      <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </Switch.Root>
  </fieldset>
)

export const SelectComp = <T extends string>({
  label,
  values,
  value,
  setValue,
}: ISelects<T> & IBearStore<T>) => {
  return (
    <fieldset className="mb-[15px] flex items-center gap-5">
      <label className="text-violet11 w-[90px] text-right text-[15px]">
        {label}
      </label>

      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger
          className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
          aria-label={label}
        >
          <Select.Value />
          <Select.Icon className="text-violet11">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                {values.map((v) => (
                  <SelectItem key={v.value} value={v.value}>
                    {v.desc || v.value}
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </fieldset>
  )
}

export const GameSettingsContainer = ({
  ...props
}: PropsWithChildren & DialogTriggerProps) => {
  const controlModeProps: ISelects<ControlMode> & IBearStore<ControlMode> = {
    ...CONFIG.userPreference.controlMode,
    ...useControlMode(),
  }
  const renderModeProps: ISelects<RenderMode> & IBearStore<RenderMode> = {
    ...CONFIG.userPreference.renderMode,
    ...useRenderMode(),
  }
  const uiLibraryProps: ISelects<UILibrary> & IBearStore<UILibrary> = {
    ...CONFIG.userPreference.uiLibrary,
    ...useUILibrary(),
  }
  const labelProps: ISwitch & IBearStore<boolean> = {
    ...CONFIG.userPreference.label,
    ...useLabelEnabled(),
  }
  const bgmProps: ISwitch & IBearStore<boolean> = {
    ...CONFIG.userPreference.bgm,
    ...useBGMEnabled(),
  }

  const [settingOpened, setSettingOpened] = useState(false)

  return (
    <Dialog.Root
      open={settingOpened}
      onOpenChange={(v) => {
        client.do({ type: v ? "pause" : "resume" })
        setSettingOpened(v)
      }}
    >
      <Dialog.Trigger {...props} />

      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />

      <Dialog.Portal>
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            设置
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            超神的操作离不开非凡的设置
          </Dialog.Description>

          <SelectComp {...controlModeProps} />

          <Separator.Root className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />

          <SelectComp {...renderModeProps} />

          <SwitchComp {...bgmProps} />
          <SwitchComp {...labelProps} />

          <Separator.Root className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />

          <SelectComp {...uiLibraryProps} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
