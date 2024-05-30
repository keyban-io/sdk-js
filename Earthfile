VERSION 0.8

get-wasm:
    FROM scratch
    COPY ../signers/eddsa/wasm-client+wasm/pkg /pkg
    SAVE ARTIFACT /pkg AS LOCAL ./packages/sdk-wasm


live:
    FROM ../../+node
    WORKDIR /app
    COPY --dir package.json pnpm-lock.yaml pnpm-workspace.yaml /app
    DO ../../+USEPNPM
    RUN pnpm install
    COPY --dir biome.json apps packages /app
    CMD pnpm dev
    ARG --required ref
    SAVE IMAGE --push ${ref}
