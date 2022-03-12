import { nextTick } from 'vue'
import { createI18n, I18n } from 'vue-i18n'
import enLocale from './locales/en.json'

export enum AppLocale {
  en = 'en',
  ru = 'ru',
}

export const i18n = createI18n({
  // something vue-i18n options here ...
  legacy: false,
  locale: AppLocale.en,
  fallbackLocale: AppLocale.en,
  messages: { [AppLocale.en]: enLocale },
  pluralizationRules: {
    /**
     * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
     * @param choicesLength {number} an overall amount of available choices
     * @returns a final choice index to select plural word by
     */
    [AppLocale.ru]: (choice, choicesLength) => {
      // this === VueI18n instance, so the locale property also exists here

      if (choice === 0) {
        return 0
      }

      const teen = choice > 10 && choice < 20
      const endsWithOne = choice % 10 === 1

      if (choicesLength < 4) {
        return !teen && endsWithOne ? 1 : 2
      }
      if (!teen && endsWithOne) {
        return 1
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2
      }

      return choicesLength < 4 ? 2 : 3
    },
  },
})

export function setI18nLanguage(i18n: I18n<unknown, unknown, unknown, false>, locale: AppLocale) {
  i18n.global.locale.value = locale
  i18n.global.pluralRules[locale] = function (choice: number, choicesLength: number) {
    console.log(choice)
    if (choice === 1) {
      return 0
    }

    return 1
  }

  document.querySelector('html')?.setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n: I18n<unknown, unknown, unknown, false>, locale: AppLocale) {
  // load locale messages with dynamic import
  const messages = await import(/* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`)

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  await nextTick()
}
