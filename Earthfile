VERSION 0.8

get-eddsa-wasm:
    FROM scratch
    COPY ../signers/eddsa/wasm-client+wasm/pkg /pkg
    SAVE ARTIFACT /pkg AS LOCAL ./packages/sdk-eddsa-wasm

get-ecdsa-wasm:
    FROM scratch
    COPY ./packages/sdk-ecdsa-wasm/* /pkg/
    COPY ../signers/ecdsa/+wasm/ecdsa.wasm /pkg/
    COPY ../signers/ecdsa/+wasm-exec/wasm_exec.js /pkg/
    SAVE ARTIFACT /pkg/ecdsa.wasm AS LOCAL ./packages/sdk-ecdsa-wasm/ecdsa.wasm
    SAVE ARTIFACT /pkg/wasm_exec.js AS LOCAL ./packages/sdk-ecdsa-wasm/wasm_exec.js
    SAVE ARTIFACT /pkg

GET_PACKAGE_JSON:
    FUNCTION
    COPY package.json pnpm-workspace.yaml .
    COPY +get-eddsa-wasm/pkg/package.json                ./packages/sdk-eddsa-wasm/
    COPY +get-ecdsa-wasm/pkg/package.json                ./packages/sdk-ecdsa-wasm/
    COPY ./packages/sdk-base/package.json                ./packages/sdk-base/
    COPY ./packages/sdk-react/package.json               ./packages/sdk-react/
    # COPY ./packages/sdk-react-native/package.json        ./packages/sdk-react-native/

update-lock-file:
    FROM ../+node
    DO ../+USEPNPM

    WORKDIR /app

    DO +GET_PACKAGE_JSON
    COPY ./apps/demo-app/package.json                    ./apps/demo-app/
    COPY ./apps/web-app/package.json                     ./apps/web-app/

    RUN pnpm install
    SAVE ARTIFACT pnpm-lock.yaml AS LOCAL pnpm-lock.yaml

sdk-build:
    FROM ../+node
    DO ../+USEPNPM

    WORKDIR /app
    COPY pnpm-lock.yaml .

    DO +GET_PACKAGE_JSON

    RUN pnpm install

    COPY +get-eddsa-wasm/pkg/*        ./packages/sdk-eddsa-wasm
    COPY +get-ecdsa-wasm/pkg/*        ./packages/sdk-ecdsa-wasm
    COPY ./packages/sdk-base          ./packages/sdk-base
    COPY ./packages/sdk-react         ./packages/sdk-react
    # COPY ./packages/sdk-react-native  ./packages/sdk-react-native

    RUN pnpm build

app-base:
    FROM +sdk-build
    ARG --required app
    COPY ./apps/${app}/package.json ./apps/${app}/

    RUN pnpm install

    COPY ./apps/${app} ./apps/${app}

live:
    ARG --required app
    FROM +app-base --app=${app}
    CMD pnpm --parallel --filter ${app}... dev
    ARG --required ref
    ARG extra_ref
    SAVE IMAGE --push ${ref} ${extra_ref}

build:
    ARG --required app
    FROM +app-base --app=${app}
    RUN pnpm --filter ${app}... build

dist:
    ARG --required app
    FROM +build --app="${app}"
    SAVE ARTIFACT /app/apps/${app}/dist

docker:
    FROM ../+sws
    COPY ./sws.toml /
    WORKDIR /public
    CMD static-web-server --config-file /sws.toml --page-fallback /public/index.html
    ARG --required app
    COPY (+dist/dist/ --app="${app}") /public/
    ARG --required ref
    ARG extra_ref
    SAVE IMAGE --push ${ref} ${extra_ref}
