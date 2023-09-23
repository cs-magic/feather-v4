import { ControlMode, RenderMode, UILibrary } from "@/store"
import { ISelects } from "@/ds"

export const siteConfig = {
  links: {
    company: "https://cs-magic.com",
    github: "https://github.com/cs-magic/blow-feather",
  },
}

export const GAME_LIFE_MAX = 5

export const PLAYER_LIFE_MAX = 100
export const PLAYER_RAGE_MAX = 100

export const CLIENT_FPS = 30
export const SERVER_FPS = 50

export const PLAYER_DEFAULT_ID = "ljq"

export const PLAYER = {
  id: {
    default: "ljq",
  },
  x: {
    default: 0.5,
    min: 0.05,
    max: 0.95,
  },
}

export const PLAYER_IMAGE_WIDTH = 200
export const TOTAL_PROGRESS = 79

export const config = {
  userPreference: {
    renderMode: {
      label: "渲染引擎",
      values: [
        {
          value: "CSS",
          desc: "标准模式（对设备性能要求略高）",
        },
        {
          value: "Canvas",
          desc: "Beta模式（画面更流畅）",
        },
      ],
    } as ISelects<RenderMode>,
    controlMode: {
      label: "操控模式",
      values: [
        {
          value: "gesture",
          desc: "手势（操作更简单，可以单手）",
        },
        {
          value: "joystick",
          desc: "摇杆（操作更灵活）",
        },
      ],
    } as ISelects<ControlMode>,
    uiLibrary: {
      label: "UI库",
      values: [
        {
          value: "radix-ui",
          desc: "",
        },
        {
          value: "daisyui",
          desc: "",
        },
      ],
    } as ISelects<UILibrary>,
    label: {
      label: "显示标签",
    },
    bgm: {
      label: "背景音乐",
    },
  },
}
