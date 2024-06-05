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
    FROM cypress/included:cypress-13.11.0-node-20.14.0-chrome-125.0.6422.141-1-ff-126.0.1-edge-125.0.2535.85-1
    ENV PNPM_HOME="/pnpm"
    ENV PATH="$PNPM_HOME:$PATH"
    RUN corepack enable pnpm
    WORKDIR /app
    CMD find . -name "node_modules" -type d -exec rm -rf {} +
    COPY --dir run-dev.sh package.json pnpm-lock.yaml pnpm-workspace.yaml biome.json apps packages /app
    DO ../+USEPNPM
    RUN pnpm install
    RUN pnpm --filter web-app run e2e:chrome

live:
    FROM +src
    CMD pnpm dev
    ARG --required ref
    SAVE IMAGE --push ${ref}
