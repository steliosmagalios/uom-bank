import type { UserConfig } from "vite";
import * as reactPlugin from "vite-plugin-react";

const config: UserConfig = {
  jsx: "react",
  plugins: [reactPlugin],
  cors: true,
};

export default config;
