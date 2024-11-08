/**
 * Forked from https://github.com/remix-run/indie-stack/blob/main/remix.init/index.js
 */

const { execSync } = require("node:child_process");
const fs = require("node:fs/promises");
const path = require("node:path");

const PackageJson = require("@npmcli/package-json");
const semver = require("semver");

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getPackageManagerCommand(packageManager) {
  // Inspired by https://github.com/nrwl/nx/blob/bd9b33eaef0393d01f747ea9a2ac5d2ca1fb87c6/packages/nx/src/utils/package-manager.ts#L38-L103
  const commands = {
    bun: () => ({
      exec: "bunx",
      lockfile: "bun.lockb",
      name: "bun",
      run: (script, args) => `bun run ${script} ${args || ""}`,
    }),
    npm: () => ({
      exec: "npx",
      lockfile: "package-lock.json",
      name: "npm",
      run: (script, args) => `npm run ${script} ${args ? `-- ${args}` : ""}`,
    }),
    pnpm: () => {
      const pnpmVersion = getPackageManagerVersion("pnpm");
      const includeDoubleDashBeforeArgs = semver.lt(pnpmVersion, "7.0.0");
      const useExec = semver.gte(pnpmVersion, "6.13.0");

      return {
        exec: useExec ? "pnpm exec" : "pnpm run",
        lockfile: "pnpm-lock.yaml",
        name: "pnpm",
        run: (script, args) =>
          includeDoubleDashBeforeArgs
            ? `pnpm run ${script} ${args ? `-- ${args}` : ""}`
            : `pnpm run ${script} ${args || ""}`,
      };
    },
    yarn: () => ({
      exec: "yarn",
      lockfile: "yarn.lock",
      name: "yarn",
      run: (script, args) => `yarn ${script} ${args || ""}`,
    }),
  };

  return commands[packageManager]();
}

function getPackageManagerVersion(packageManager) {
  // Copied over from https://github.com/nrwl/nx/blob/bd9b33eaef0393d01f747ea9a2ac5d2ca1fb87c6/packages/nx/src/utils/package-manager.ts#L105-L114
  return execSync(`${packageManager} --version`).toString("utf-8").trim();
}

function removeUnusedDependencies(dependencies, unusedDependencies) {
  return Object.fromEntries(
    Object.entries(dependencies).filter(
      ([key]) => !unusedDependencies.includes(key),
    ),
  );
}

function updateScriptsWithPM(scripts, packageManager) {
  const pm = getPackageManagerCommand(packageManager);
  const isFn = typeof pm.exec === "function";

  return Object.fromEntries(
    Object.entries(scripts).map(([key, value]) => [
      key,
      value
        .replaceAll("{{pm}}", isFn ? pm.exec() : pm.exec)
    ]),
  );
}

function updatePackageJson({ APP_NAME, packageJson, packageManager }) {
  const { devDependencies, scripts } = packageJson.content;

  packageJson.update({
    name: APP_NAME,
    devDependencies:
      packageManager.name === "bun"
        ? removeUnusedDependencies(devDependencies, ["tsx"])
        : devDependencies,
    scripts: updateScriptsWithPM(scripts, packageManager.name),
  });
}

async function main({ packageManager, rootDirectory }) {
  const pm = getPackageManagerCommand(packageManager);

  const README_PATH = path.join(rootDirectory, "README.md");
  const REPLACER = "slowcore-remix-stack";
  const DIR_NAME = path.basename(rootDirectory);
  const APP_NAME = DIR_NAME
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, "-");

  const [readme, packageJson] = await Promise.all([
    fs.readFile(README_PATH, "utf-8"),
    PackageJson.load(rootDirectory),
  ]);

  const newReadme = readme.replace(
    new RegExp(escapeRegExp(REPLACER), "g"),
    APP_NAME,
  );

  updatePackageJson({ APP_NAME, packageJson, packageManager: pm });

  await Promise.all([
    packageJson.save(),
    fs.copyFile(
      path.join(rootDirectory, "remix.init", "gitignore"),
      path.join(rootDirectory, ".gitignore"),
    ),
    fs.writeFile(README_PATH, newReadme),
  ]);
  console.log(
    `Setup is complete 🎸
You can now start developing your Remix app.

Start development with \`${pm.run("dev")}\`
    `.trim(),
  );
}

module.exports = main;
