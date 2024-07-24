VERSION 0.8

get-eddsa-wasm:
    FROM scratch
    COPY ../signers/eddsa/wasm-client+wasm/pkg /pkg
    SAVE ARTIFACT /pkg AS LOCAL ./packages/sdk-eddsa-wasm

get-ecdsa-wasm:
    FROM scratch
    COPY --dir ../signers/ecdsa/+wasm/ecdsa.wasm /pkg/
    COPY --dir ../signers/ecdsa/+wasm-exec/wasm_exec.js /pkg/
    SAVE ARTIFACT /pkg/ecdsa.wasm AS LOCAL ./packages/sdk-ecdsa-wasm/ecdsa.wasm
    SAVE ARTIFACT /pkg/wasm_exec.js AS LOCAL ./packages/sdk-ecdsa-wasm/wasm_exec.js

src:
    FROM ../+node
    WORKDIR /app
    COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .
    COPY ./packages/docgen/package.json                  ./packages/docgen/
    COPY ./packages/sdk-base/package.json                ./packages/sdk-base/
    COPY ./packages/sdk-react/package.json               ./packages/sdk-react/
    COPY ./packages/sdk-react-native/package.json        ./packages/sdk-react-native/
    COPY ./packages/sdk-ecdsa-wasm/package.json          ./packages/sdk-ecdsa-wasm/
    COPY +get-eddsa-wasm/pkg/package.json                ./packages/sdk-eddsa-wasm/
    COPY ./apps/web-app/package.json                     ./apps/web-app/
    COPY ./apps/demo-app/package.json                    ./apps/demo-app/
    DO ../+USEPNPM
    RUN pnpm install
    COPY --dir ./packages/docgen/src ./packages/docgen/tsconfig.json ./packages/docgen
    COPY +get-eddsa-wasm/pkg/* ./packages/sdk-eddsa-wasm
    COPY ./packages/sdk-ecdsa-wasm ./packages/sdk-ecdsa-wasm
    COPY +get-ecdsa-wasm/wasm_exec.js ./packages/sdk-ecdsa-wasm/wasm_exec.js
    COPY +get-ecdsa-wasm/ecdsa.wasm ./packages/sdk-ecdsa-wasm/ecdsa.wasm
    COPY run-dev.sh .
    COPY ./apps/web-app ./apps/web-app
    COPY ./apps/demo-app ./apps/demo-app
    COPY --dir ./packages/sdk-base/src ./packages/sdk-base/vitest.config.mts ./packages/sdk-base/tsup.config.ts ./packages/sdk-base/tsconfig.json /app/packages/sdk-base/
    COPY --dir ./packages/sdk-react/src ./packages/sdk-react/vitest.config.mts ./packages/sdk-react/tsup.config.ts ./packages/sdk-react/tsconfig.json /app/packages/sdk-react/
    COPY --dir ./packages/sdk-react-native/src ./packages/sdk-react-native/proto ./packages/sdk-react-native/compile.sh ./packages/sdk-react-native/vitest.config.mts ./packages/sdk-react-native/tsup.config.ts ./packages/sdk-react-native/tsconfig.json /app/packages/sdk-react-native/

build:
    FROM +src
    RUN pnpm build

live-web:
    FROM +build
    CMD sh ./run-dev.sh && pnpm --filter web-app dev
    ARG --required ref
    ARG extra_ref
    SAVE IMAGE --push ${ref} ${extra_ref}

live-demo:
    FROM +build
    CMD sh ./run-dev.sh && pnpm --filter demo-app dev
    ARG --required ref
    SAVE IMAGE --push ${ref}

docgen:
    FROM +src
    RUN pnpm --filter docgen build
    SAVE ARTIFACT ./packages/docgen/docs sdk-docs
