VERSION 0.8

get-wasm:
    FROM scratch
    COPY ../signers/eddsa/wasm-client+wasm/pkg /pkg
    SAVE ARTIFACT /pkg AS LOCAL ./packages/sdk-wasm

src:
    FROM ../+node
    WORKDIR /app
    COPY --dir package.json pnpm-lock.yaml pnpm-workspace.yaml /app
    COPY --dir ./packages/sdk-base/package.json /app/packages/sdk-base/
    COPY --dir ./packages/sdk-react/package.json /app/packages/sdk-react/
    COPY --dir ./packages/sdk-react-native/package.json /app/packages/sdk-react-native/
    COPY --dir ./apps/web-app/package.json /app/apps/web-app/
    COPY --dir +get-wasm/pkg/package.json /app/packages/sdk-wasm/
    DO ../+USEPNPM
    RUN pnpm install
    COPY --dir +get-wasm/pkg/* /app/packages/sdk-wasm/
    COPY --dir run-dev.sh biome.json apps packages /app

live:
    FROM +src
    RUN pnpm build
    CMD pnpm dev
    ARG --required ref
    SAVE IMAGE --push ${ref}

docs:
    FROM +src
    RUN pnpm build
    RUN pnpm build:docs
    SAVE ARTIFACT ./packages/sdk-base/docs sdk-base-docs
    SAVE ARTIFACT ./packages/sdk-react/docs sdk-react-docs
    SAVE ARTIFACT ./packages/sdk-react-native/docs sdk-react-native-docs
