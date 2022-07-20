import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    output: {
      mode: "single",
      target: "src/petstore.ts",
      schemas: "src/model",
      client: "react-query",
      mock: true,
    },
    input: {
      target: "./petstore.yaml",
    },
  },
});
