import "./utils/create-ui.js";

export default function plop(/** @type {import("plop").NodePlopAPI} */ plop) {
  plop.setGenerator("ui", {
    description: "Create a new UI component",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "Component type",
        choices: ["atom", "molecule", "organism"],
      },
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "./app/ui/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "./plop-templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "./app/ui/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "./plop-templates/Story.tsx.hbs",
      },
      {
        type: "add",
        path: "./app/ui/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "./plop-templates/Test.tsx.hbs",
      },
      {
        type: "append",
        path: "./app/ui/{{type}}s/handlers.ts",
        template:
          'export { default as {{pascalCase name}} } from "./{{pascalCase name}}/{{pascalCase name}}";',
      },
    ],
  });

  plop.setGenerator("feature", {
    description: "Create a new feature",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Feature name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "./app/features/{{pascalCase name}}/{{pascalCase name}}.tsx",
        template:
          "export default function {{pascalCase name}}() {return <div>{{pascalCase name}}</div>}",
      },
      {
        type: "add",
        path: "./app/features/{{pascalCase name}}/handlers.ts",
        template:
          'export { {{pascalCase name}} } from "./{{pascalCase name}}";',
      },
      {
        type: "append",
        path: "./app/features/handlers.ts",
        template:
          'import * as {{pascalCase name}}Feature from "./{{pascalCase name}}";',
      },
    ],
  });

  plop.setGenerator("hook", {
    description: "Create a new hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Hook name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "./app/hooks/{{camelCase name}}/{{camelCase name}}.ts",
        template: "export default function {{camelCase name}}() {}",
      },
      {
        type: "add",
        path: "./app/hooks/{{camelCase name}}/{{camelCase name}}.test.tsx",
        templateFile: "./plop-templates/Hook.test.tsx.hbs",
      },
      {
        type: "append",
        path: "./app/hooks/index.ts",
        template:
          'export { default as {{camelCase name}} } from "./{{camelCase name}}/{{camelCase name}}.ts";\n',
      },
    ],
  });
}
