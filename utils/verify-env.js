import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

function checkType(input) {
  if (input === "") return "string";
  if (input === "true" || input === "false") return "boolean";
  return Number.isNaN(Number(input)) ? "string" : "number";
}

export async function checkEnvVariables() {
  const exampleFilePath = path.resolve(".env.example");

  try {
    const exampleFileContent = await fs.readFile(exampleFilePath, "utf-8");
    const exampleEnv = dotenv.parse(exampleFileContent);

    const missingKeys = Object.keys(exampleEnv).filter(
      (key) => !(key in process.env),
    );

    if (missingKeys.length > 0) {
      console.error("Missing environment variables:", missingKeys.join(", "));
      return Promise.reject(new Error("Missing environment variables"));
    }
    console.log("All environment variables are declared.");
    return Promise.resolve();
  } catch (error) {
    console.error("Error reading .env.example file:", error);
    return Promise.reject(error);
  }
}

export async function generateEnvTypes() {
  const exampleFilePath = path.resolve(".env.example");
  const configFilePath = path.resolve("./config/env.ts");
  let existingConfigContent = await fs.readFile(configFilePath, "utf-8");

  try {
    const exampleFileContent = await fs.readFile(exampleFilePath, "utf-8");
    const exampleEnv = dotenv.parse(exampleFileContent);

    const interfaceDefinitions = `
interface EnvConfig {
${Object.keys(exampleEnv)
  .filter((key) => key.startsWith("VITE_"))
  .map((key) => `  ${key}: ${checkType(process.env[key])};`)
  .join("\n")}
}
`;

    existingConfigContent = existingConfigContent
      .replace(/interface EnvConfig {[^}]*}/, "")
      .trim();

    const newConfigContent = `${interfaceDefinitions.trim()}\n\n${existingConfigContent}`;
    await fs.writeFile(configFilePath, newConfigContent);
    console.log("Type definitions and interface generated successfully.");
  } catch (error) {
    console.error("Error generating type definitions:", error);
  }
}
