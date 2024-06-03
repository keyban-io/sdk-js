VERSION 0.8

get-wasm:
    FROM scratch
    COPY ../signers/eddsa/wasm-client+wasm/pkg /pkg
    SAVE ARTIFACT /pkg AS LOCAL ./packages/sdk-wasm


live:
    FROM ../+node
    WORKDIR /app
    CMD find . -name "node_modules" -type d -exec rm -rf {} +
    COPY --dir run-dev.sh package.json pnpm-lock.yaml pnpm-workspace.yaml biome.json apps packages /app
    DO ../+USEPNPM
    RUN pnpm install
    CMD pnpm dev
    ARG --required ref
    SAVE IMAGE --push ${ref}
