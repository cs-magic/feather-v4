import { ControlMode, RenderMode, UILibrary } from "@/store"
import { ISelects } from "@/ds"

export const siteConfig = {
  links: {
    company: "https://cs-magic.com",
    github: "https://github.com/cs-magic/blow-feather",
  },
}

export const GAME = {
  life: {
    max: 5,
  },
  targetFeathers: 79,
  fps: {
    server: 50,
    client: 30,
  },
}

export const PLAYER = {
  id: {
    default: "ljq",
  },
  x: {
    default: 0.5,
    min: 0.05,
    max: 0.95,
  },
  life: {
    max: 100,
  },
  rage: {
    max: 100,
  },
  w: 0.28,
}

export const CONFIG = {
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
