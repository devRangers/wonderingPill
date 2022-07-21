import { defineConfig } from "orval";

export default defineConfig({
  WonderingPill: {
    output: {
      mode: "single",
      schemas: "src/model",
    },
    input: {
      target: "./swagger.json",
    },
  },
});
