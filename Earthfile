VERSION 0.8

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
    COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .
    COPY +get-ecdsa-wasm/pkg/package.json   ./packages/sdk-ecdsa-wasm/
    COPY ./packages/sdk-base/package.json   ./packages/sdk-base/
    COPY ./packages/sdk-react/package.json  ./packages/sdk-react/
    COPY ./packages/mui-theme/package.json  ./packages/mui-theme/

update-lock-file:
    FROM ../+node
    DO ../+USEPNPM

    WORKDIR /app

    DO +GET_PACKAGE_JSON
    COPY ./apps/waas-demo/package.json  ./apps/waas-demo/
    COPY ./apps/web-app/package.json    ./apps/web-app/

    RUN pnpm install
    SAVE ARTIFACT pnpm-lock.yaml AS LOCAL pnpm-lock.yaml

sdk-build:
    FROM ../+node
    DO ../+USEPNPM

    WORKDIR /app

    DO +GET_PACKAGE_JSON

    RUN pnpm install

    COPY +get-ecdsa-wasm/pkg/*  ./packages/sdk-ecdsa-wasm
    COPY ./packages/sdk-base    ./packages/sdk-base
    COPY ./packages/sdk-react   ./packages/sdk-react
    COPY ./packages/mui-theme   ./packages/mui-theme

    RUN pnpm -r build

sdk-release-ga:
    ARG --required package
    ARG --required version

    FROM +sdk-build
    RUN apt update && apt install -y python3
    COPY ../tools/bitwarden+bitwarden/bws /bws

    WORKDIR ./packages/$package
    RUN pnpm version $version --git-tag-version=false
    RUN --no-cache --secret BWS_ACCESS_TOKEN \
        ENV=prod /bws/runwithsecrets 'NPM_TOKEN' \
        pnpm publish --no-git-checks --dry-run

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
    RUN pnpm --filter ${app} build

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
