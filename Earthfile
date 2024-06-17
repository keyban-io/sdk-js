VERSION 0.8

get-wasm:
    FROM scratch
    COPY ../signers/eddsa/wasm-client+wasm/pkg /pkg
    SAVE ARTIFACT /pkg AS LOCAL ./packages/sdk-wasm

src:
    FROM ../+node
    WORKDIR /app
    COPY --dir run-dev.sh package.json pnpm-lock.yaml pnpm-workspace.yaml biome.json apps packages /app
    COPY --dir +get-wasm/pkg /app/packages/sdk-wasm
    DO ../+USEPNPM
    RUN pnpm install

live:
    FROM +src
    CMD pnpm dev
    ARG --required ref
    SAVE IMAGE --push ${ref}

docs:
    FROM +src
    RUN pnpm build
    RUN pnpm build:docs 
    SAVE ARTIFACT ./packages/sdk-base/docs 
    SAVE ARTIFACT ./packages/sdk-react/docs
    SAVE ARTIFACT ./packages/sdk-react-native/docs
