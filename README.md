# slowcore-remix-stack

🎸 Some mandatory soundtracks for this project:

- [_Karate_ by Karate](https://rateyourmusic.com/release/album/karate/karate/)
- [_Stratosphere_ by Duster](https://rateyourmusic.com/release/album/duster/stratosphere/)
- [_Giles Corey_ by Giles Corey](https://rateyourmusic.com/release/album/giles-corey/giles-corey/)
- [_On Fire_ by Galaxie 500](https://rateyourmusic.com/release/album/galaxie_500/on_fire/)
- [_North Star Deserter_ by Vic Chesnutt](https://rateyourmusic.com/release/album/vic-chesnutt/north-star-deserter/)

---

This is a simple starter for [Remix](https://remix.run/). I am using this
framework quite often and I wanted to have a simple starter to kickstart my
development. It's, like always, opinionated. I hope you like it, and would
greatly appreciate any feedback and/or contributions.

Please note that _this is not_ a fullstack template per se. I am using this
as a backed-for-frontend solution, with the actual being a separate project
(or another part of a monorepo).

---

## Getting started

Install it with

```bash
npx create-remix@latest --template tomekbuszewski/slowcore-stack
```

or

```bash
pnpm create remix@latest --template karate-remix-template
```

or whatever package manager is currently in fashion.

### The gist

- Formatting with [Prettier](https://prettier.io/);
- Linting with [ESLint](https://eslint.org/);
- Type safety with [TypeScript](https://www.typescriptlang.org/);
- Styling with [Tailwind CSS](https://tailwindcss.com/);
- Tests with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/docs/react-testing-library/intro);
- E2E with [Playwright](https://playwright.dev/);

For more detailed description and explanation of some of my choices, 
please read on 👇.

---

## Features

### Linting and formatting

I've dropped ESLint and Prettier in favor of Biome. It's a simple tool that
combines both of them. It's a bit less configurable, especially if you want
to have extensive linting, but I found out that most of the ESLint rules aren't
really applicable to my cases, and Biome comes with a great set of defaults.

### Styling with Tailwind CSS

I've added Tailwind CSS to the project. It's a great utility-first CSS framework,
and it comes with neat plugins: 

- view transitions (to apply route transitions if needed);
- animate (to have basic animations out of the box);
- forms (to have basic form styles).

Obviously, all of these can be turned off using `tailwind.config.ts` file.

### ENV Validation

This starter comes with a simple mechanism to verify whether all the environment
variables are set. It checks your environment against `.env.example` file and
throws if any of the variables are missing.

It also generates type definitions for your environment variables in 
`./config/env.ts`, so you can use them in your code. There's a very simple
mechanism to check for the type, so instead of having everything as `string`,
you'll get `number`, `boolean`, or `string`.

You can either use `env` object, which provides a Record of environment variables,
or `getEnv` function, which is typed by env keys, so you'll get code completion.

The validator is bound to Vite and runs before starting the server. 
In development mode, it will generate the types, but on production, it will not.

Last, but not least, you can access the variables using `@env` package. It 
checks whether this is browser or server and picks the correct implementation.

**Important thing**, public types have to be prefixed with `VITE_`.

**Important thing 2**, it only checks for keys, it won't verify your values.

### Testing

Starter comes with Vitest and Testing Library for React. You can write unit and
integration tests for everything.

It also comes with Playwright, and is bound to the built local instance. Running
`pnpm run test:e2e` will first build the project and start the server
at `localhost:3000`, and then run the tests.

MSW is added to the project. You can use it to mock all the external communication
your project uses. This way you will never query your API in tests, but you will
also don't have to catch requests and patch them. Simply define a handler
and you're good.

### UI Generation

This starter comes with a simple mechanism to generate UI components based on
Plop. You can generate UI elements according to Atomic Design guidelines.

If you want to know more about Atomic Design, or the generator, consider
checking my blogposts and/or YouTube videos:

- Atomic Design in React [blog](https://buszewski.com/writings/2024-09-23-design-systems-in-react-atomic-design-part-1), [video](https://youtu.be/ibIKjzYeQrI);
- Setup and Plop generator [blog](https://buszewski.com/writings/2024-08-13-design-systems-in-react-scaffolding-and-setup-part-0/), [video](https://youtu.be/VTiVsxkvG0Q).

### Hooks generator

Hooks are generated using Plop. Name it "use [my hook name]", it will convert 
to camelCase (useMyHookName) and will be placed in the hooks folder.

The generator will also add a test, but it's up to you to fill it with the
actual cases.

Hooks are exported from `@hooks` path, linking to `./app/hooks/index.ts` 
folder.

### Feature-based architecture

Features can be generated using Plop. It will create a basic scaffolding, but
you can extend it however you see fit. There's an example feature in the starter,
so you can see how it works and how I envision the structure.

What's important for me, is to have things in different files. Form actions,
data loaders, types, components, all this in separate files. It's easier to
navigate and to read it. Then, it has one "public" `index.ts` file, which
is utilized by the main `index` in the features folder.

Features can be tested with integration tests using Vitest, or with Playwright
for E2E tests. I suggest doing the former for more complex features that
require navigation and general user interaction. For smaller, integration
testing is enough.
