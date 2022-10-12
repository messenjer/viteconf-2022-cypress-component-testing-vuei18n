# viteconf-2022-cypress-component-testing-vuei18n

After the presentation "Cypress Component Testing" of [Jessica Sachs](https://github.com/JessicaSachs) at [ViteConf](https://viteconf.org/)

I wanted to setup Cypress Components with [vue-i18n](https://github.com/intlify/vue-i18n-next).

Documentation links :

- [Cypress Component Testing](https://on.cypress.io/component)
- [Custom Mount Commands and Styles](https://docs.cypress.io/guides/component-testing/custom-mount-vue)

## My setup

Install vue.js with cypress with `create-vue`:

```sh
npm init vue
```

Here are the options, I have chosen

```
Vue.js - The Progressive JavaScript Framework

✔ Project name: … cypress-component
✔ Add TypeScript? … Yes
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? … Yes
✔ Add Pinia for state management? … Yes
✔ Add Vitest for Unit Testing? … No
✔ Add Cypress for both Unit and End-to-End testing? … Yes
✔ Add ESLint for code quality? … Yes
✔ Add Prettier for code formatting? … No
```

⬆️ If you do not choose `vitest` for unit testing, `vue-create` will create sample folders and files for you to use with `Cypress Components`

Next, you need to install `vue-i18n`

```sh
npm install vue-i18n@9
```

and set up your [src/main.ts](src/main.ts)

In our case, the most important thing is to configure Cypress. For that, you need to update the file [cypress/support/component.ts](cypress/support/component.ts) like that:

```ts
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
```

For our example, we create a component file `HelloCypress.vue` using vue-i18n :

```vue
<script setup lang="ts"></script>
<template>
  <h1>
    {{ $t("hello") }}
  </h1>
</template>
```

Create a test file `HelloCypress.cy.ts`

Add a test, to test if the component displays the message `hello!` with the default english translation that we added in the file `cypress/support/component.ts` :

```ts
it("display hello message from the default options", () => {
  cy.mount(HelloCypress);
  cy.get("h1").should("contain", "hello!");
});
```

Add a test, where we pass the translations option (`i18n`), in the `cy.mount` option parameters, where we set `japanese` as a locale and to test if the component displays the message `こんにちは！`

```ts
it("display the japanese hello message from the default options", () => {
  cy.mount(HelloCypress, {
    i18n: {
      locale: "ja",
      messages: {
        en: {
          hello: "hello",
        },
        ja: {
          hello: "こんにちは！",
        },
      },
    },
  });
  cy.get("h1").should("contain", "こんにちは！");
});
```
