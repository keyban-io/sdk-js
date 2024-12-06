VERSION 0.8

get-ecdsa-wasm:
    FROM scratch
    COPY ./packages/ecdsa-wasm-client/* /pkg/
    COPY ../signers/ecdsa/+wasm/ecdsa.wasm /pkg/
    COPY ../signers/ecdsa/+wasm-exec/wasm_exec.js /pkg/
    SAVE ARTIFACT /pkg/ecdsa.wasm AS LOCAL ./packages/ecdsa-wasm-client/ecdsa.wasm
    SAVE ARTIFACT /pkg/wasm_exec.js AS LOCAL ./packages/ecdsa-wasm-client/wasm_exec.js
    SAVE ARTIFACT /pkg

GET_PACKAGE_JSON:
    FUNCTION
    COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .
    COPY +get-ecdsa-wasm/pkg/package.json           ./packages/ecdsa-wasm-client/
    COPY ./packages/sdk-base/package.json           ./packages/sdk-base/
    COPY ./packages/sdk-react/package.json          ./packages/sdk-react/
    COPY ./packages/mui-theme/package.json          ./packages/mui-theme/
    COPY ./packages/create-keyban-app/package.json  ./packages/create-keyban-app/

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

    COPY +get-ecdsa-wasm/pkg/*          ./packages/ecdsa-wasm-client
    COPY ./packages/sdk-base            ./packages/sdk-base
    COPY ./packages/sdk-react           ./packages/sdk-react
    COPY ./packages/mui-theme           ./packages/mui-theme
    COPY ./packages/create-keyban-app   ./packages/create-keyban-app
    COPY ./packages/tsconfig.base.json  ./packages/tsconfig.base.json

    RUN pnpm -r build

sdk-release-ga:
    FROM +sdk-build
    RUN apt update && apt install -y python3
    COPY ../tools/bitwarden+bitwarden/bws /bws

    ARG --required package
    ARG --required version

    WORKDIR ./packages/$package
    RUN pnpm version $version --git-tag-version=false
    RUN --no-cache --secret BWS_ACCESS_TOKEN \
        ENV=prod /bws/runwithsecrets 'NPM_TOKEN' \
        sh -c 'pnpm set //registry.npmjs.org/:_authToken $NPM_TOKEN'
    RUN --no-cache pnpm publish --no-git-checks

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

lint:
    FROM ../+node
    DO ../+USEPNPM

    WORKDIR /app
    COPY . ./

    RUN pnpm install
    RUN pnpm -r lint

test:
    FROM ../+node
    DO ../+USEPNPM

    WORKDIR /app
    COPY . ./

    RUN pnpm install
    # Ignore tss-storage-consent-poc as it should be removed soon and it's build is broken
    RUN rn -rf ./apps/tss-storage-consent-poc
    RUN pnpm -r build
    RUN pnpm -r test

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
