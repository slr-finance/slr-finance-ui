import { NavigationGuardWithThis } from 'vue-router'
import { AppLocale, i18n, loadLocaleMessages, setI18nLanguage } from './i18n'

export const routerBeforeEach: NavigationGuardWithThis<unknown> = async (to, from, next) => {
  const paramsLocale = to.params.locale as AppLocale

  // use locale if paramsLocale is not in SUPPORT_LOCALES
  if (paramsLocale === AppLocale.en || (!Object.values(AppLocale).includes(paramsLocale) && paramsLocale)) {
    delete to.params.locale

    return next(to)
  }

  // load locale messages
  const currentLocale = !paramsLocale ? AppLocale.en : paramsLocale
  if (!i18n.global.availableLocales.includes(currentLocale)) {
    await loadLocaleMessages(i18n, currentLocale)
  }

  // set i18n language
  setI18nLanguage(i18n, currentLocale)

  return next()
}
