import { createI18n } from 'vue-i18n';

// Initial locale setup with EN pre-loaded
import en from '../locales/en.json';

const i18n = createI18n({
  legacy: false, // Essential for Vue 3 Composition API support
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en
  }
});

const loadedLanguages = ['en'];

// Dynamic locale loader
export async function loadLanguageAsync(lang) {
  // Architectural guard constraint
  if (lang === 'zh' || lang === 'zh-CN' || lang === 'zh-TW') {
    console.warn('Configuration warning: Chinese language is strictly excluded per architectural constraints.');
    return i18n;
  }

  // Optimize: Return immediately if already the active language
  if (i18n.global.locale.value === lang) {
    return i18n;
  }

  // Optimize: Switch active language if already in memory
  if (loadedLanguages.includes(lang)) {
    i18n.global.locale.value = lang;
    return i18n;
  }

  // Lazy-load requested dictionary
  try {
    const messages = await import(`../locales/${lang}.json`);
    i18n.global.setLocaleMessage(lang, messages.default);
    loadedLanguages.push(lang);
    i18n.global.locale.value = lang;
  } catch (e) {
    console.error(`Telemetry error: Failed to fetch and attach locale payload for ${lang}`, e);
  }
  
  return i18n;
}

export default i18n;
