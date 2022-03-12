import { Plugin } from 'vue'
import { LocationAsRelativeRaw } from 'vue-router'
import { AppLocale, i18n } from './i18n'

export type I18nRouteHelper = <T extends LocationAsRelativeRaw>(route: T) => T

export const i18nRouteHelper: I18nRouteHelper = (route) => {
  const locale = i18n.global.locale.value

  return {
    ...route,
    params: {
      ...route.params,
      locale: locale === AppLocale.en ? '' : locale,
    },
  }
}

export const i18nRouteHelperPlugin: Plugin = {
  install(app) {
    app.config.globalProperties.i18nRouteHelper = i18nRouteHelper
  },
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    i18nRouteHelper: I18nRouteHelper
  }
}
