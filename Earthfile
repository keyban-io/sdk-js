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
    COPY --dir ./packages/docgen/package.json /app/packages/docgen/
    DO ../+USEPNPM
    RUN pnpm install
    COPY --dir ./packages/docgen/src ./packages/docgen/tsconfig.json /app/packages/docgen/
    COPY --dir +get-wasm/pkg/* /app/packages/sdk-wasm/
    COPY --dir run-dev.sh /app
    COPY --dir ./apps/web-app/src ./apps/web-app/public ./apps/web-app/tsconfig.json ./apps/web-app/vite.config.ts ./apps/web-app/index.html ./apps/web-app/tsconfig.node.json /app/apps/web-app/
    COPY --dir ./packages/sdk-base/src ./packages/sdk-base/vitest.config.mts ./packages/sdk-base/tsup.config.ts ./packages/sdk-base/tsconfig.json /app/packages/sdk-base/
    COPY --dir ./packages/sdk-react/src ./packages/sdk-react/vitest.config.mts ./packages/sdk-react/tsup.config.ts ./packages/sdk-react/tsconfig.json /app/packages/sdk-react/
    COPY --dir ./packages/sdk-react-native/src ./packages/sdk-react-native/proto ./packages/sdk-react-native/compile.sh ./packages/sdk-react-native/vitest.config.mts ./packages/sdk-react-native/tsup.config.ts ./packages/sdk-react-native/tsconfig.json /app/packages/sdk-react-native/

build:
    FROM +src
    RUN pnpm build

live:
    FROM +build
    CMD pnpm dev
    ARG --required ref
    ARG extra_ref
    SAVE IMAGE --push ${ref} ${extra_ref}

docgen:
    FROM +src
    RUN pnpm build:docs
    SAVE ARTIFACT ./packages/docgen/docs sdk-docs