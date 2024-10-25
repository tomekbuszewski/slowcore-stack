interface EnvConfig {
  VITE_PUBLIC_ENV: string;
  VITE_NUMBER: number;
  VITE_API_URL: string;
  VITE_MOCKS: boolean;
}

type EnhancedProcessEnv = NodeJS.ProcessEnv & EnvConfig;
type EnhancedImportMetaEnv = ImportMetaEnv & EnvConfig;

type Env = EnhancedProcessEnv | EnhancedImportMetaEnv;

export let env: Env;

if (typeof document === "undefined") {
  env = process.env as EnhancedProcessEnv;
} else {
  env = import.meta.env as EnhancedImportMetaEnv;
}

export function getEnv(key: keyof EnvConfig) {
  if (!env[key]) {
    throw new Error(`Env key ${key} not found`);
  }

  return env[key];
}