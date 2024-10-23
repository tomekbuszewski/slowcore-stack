interface EnvConfig {
  VITE_PUBLIC_ENV: string;
  VITE_NUMBER: number;
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