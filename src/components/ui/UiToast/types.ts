import type { UiIconProps } from '../UiIcon'

export enum UiToastType {
  SUCCESS,
  INFO,
  ERROR,
}

export type UiToastProps = {
  icon?: UiIconProps
  content: string
  type: UiToastType
  timeout?: number | boolean
}
