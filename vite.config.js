import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nightwatch from "vite-plugin-nightwatch";

export default defineConfig({
  plugins: [react(), nightwatch({ componentType: "react" })],
  server: {
    proxy: {
      "/api": "http://localhost:5174",
    },
  },
});
