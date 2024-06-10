VERSION 0.8

get-wasm:
    FROM scratch
    COPY ../signers/eddsa/wasm-client+wasm/pkg /pkg
    SAVE ARTIFACT /pkg AS LOCAL ./packages/sdk-wasm

SETUP_SRC:
    FUNCTION
    WORKDIR /app
    COPY --dir run-dev.sh package.json pnpm-lock.yaml pnpm-workspace.yaml biome.json apps packages /app
    DO ../+USEPNPM
    RUN pnpm install

src:
    FROM ../+node
    DO +SETUP_SRC

test:
    FROM cypress/included:cypress-13.11.0-node-20.14.0-chrome-125.0.6422.141-1-ff-126.0.1-edge-125.0.2535.85-1
    HOST keyban.localtest.me 198.19.248.254
    DO +SETUP_SRC
    RUN --no-cache pnpm --filter web-app run e2e

live:
    FROM +src
    CMD pnpm dev
    ARG --required ref
    SAVE IMAGE --push ${ref}
