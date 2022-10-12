// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import global styles
import "@/assets/main.css";

import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { mount } from "cypress/vue";

// We recommend that you pull this out
// into a constants file that you share with
// your main.js file.
const i18nOptions = {
  locale: "en",
  messages: {
    en: {
      hello: "hello!",
    },
    ja: {
      hello: "こんにちは！",
    },
  },
};

Cypress.Commands.add("mount", (component, options = {}) => {
  // Setup options object
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];

  // create i18n if one is not provided
  if (!options.i18n) {
    options.i18n = createI18n(i18nOptions);
  } else {
    options.i18n = createI18n(options.i18n);
  }

  // Add i18n plugin
  options.global.plugins.push({
    install(app) {
      app.use(createPinia());
      app.use(options.i18n);
    },
  });

  return mount(component, options);
});

// Example use:
// cy.mount(MyComponent)

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path='./component' /> at the top of your spec.
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
