import { createApp } from "vue";

const app = createApp({
  delimiters: ["${", "}"],
});

/**
 * registerAllComponents function imports and registers all components automatically,
 * which are defined inside the components folder /vue/components.
 * All registered components can be used with the pattern <v-{components-file-name}>.
 */
function registerAllComponents() {
  // @ts-ignore
  const components = import.meta.glob("/vue/components/**/*.vue", {
    eager: true,
  });
  for (const path in components) {
    const r = new RegExp(/(\/vue\/components\/)([^\/]+)\/?(.*)(\.vue)/, "g");
    const match = r.exec(path);
    if (match) {
      const fileName = match[3] ? match[3] : match[2];
      // @ts-ignore
      if (import.meta.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("Component registered", fileName, path);
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      app.component(`v-${fileName}`, components[path].default);
    }
  }
}

/**
 * registerAllDirectives function imports and registers all directives automatically,
 * which are defined inside the directives folder /vue/directives.
 * All registered directives can be used with the pattern <v-{directives-file-name}>.
 */
function registerAllDirectives() {
  // @ts-ignore
  const directives = import.meta.glob("/vue/directives/*.ts", {
    eager: true,
  });
  for (const path in directives) {
    const r = new RegExp(/(\/vue\/directives\/)([^\/]+)\/?(.*)(\.ts)/, "g");
    const match = r.exec(path);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.directive(match[2], directives[path].default);
  }
}

registerAllComponents();
registerAllDirectives();

app.mount("#body");

// document.querySelector(".body")?.classList.remove("body--loading");

console.log("vue initialized");
