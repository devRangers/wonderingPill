import { defineConfig } from "orval";

export default defineConfig({
  WonderingPill: {
    output: {
      mode: "tags-split",
      target: "src/WonderingPill.ts",
      schemas: "src/model",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/mutator/custom-client.ts",
          name: "customClient",
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: "limit",
        },
      },
    },
    input: {
      target: "./swagger.json",
    },
  },
});
