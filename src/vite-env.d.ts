/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_AWS_S3_BASE_URL: string;
  readonly VITE_WORLD_NEWS_API_KEY: string;
  readonly VITE_WORLD_NEWS_API_BASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
