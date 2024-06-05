VERSION 0.8

get-wasm:
    FROM scratch
    COPY ../signers/eddsa/wasm-client+wasm/pkg /pkg
    SAVE ARTIFACT /pkg AS LOCAL ./packages/sdk-wasm

src:
    FROM ../+node
    WORKDIR /app
    CMD find . -name "node_modules" -type d -exec rm -rf {} +
    COPY --dir run-dev.sh package.json pnpm-lock.yaml pnpm-workspace.yaml biome.json apps packages /app
    DO ../+USEPNPM
    RUN pnpm install

test:
    FROM +src
    CMD pnpm --filter web-app run e2e:chrome

live:
    FROM +src
    CMD pnpm dev
    ARG --required ref
    SAVE IMAGE --push ${ref}
