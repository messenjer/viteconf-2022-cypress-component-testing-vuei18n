import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const messages = {
  en: {
    message: {
      hello: "Hello Cypress",
    },
  },
  fr: {
    message: {
      hello: "Bonjour Cypress",
    },
  },
};

const i18nOptions = {
  locale: "fr",
  fallbackLocale: "en",
  messages,
};

const i18n = createI18n(i18nOptions);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
