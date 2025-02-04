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
    COPY ./apps/dpp-app/package.json    ./apps/dpp-app/

    RUN pnpm install --silent
    SAVE ARTIFACT pnpm-lock.yaml AS LOCAL pnpm-lock.yaml

sdk-build:
    FROM ../+node
    DO ../+USEPNPM

    WORKDIR /app

    DO +GET_PACKAGE_JSON

    RUN pnpm install --silent

    COPY +get-ecdsa-wasm/pkg/*          ./packages/ecdsa-wasm-client
    COPY ./packages/sdk-base            ./packages/sdk-base
    COPY ./packages/sdk-react           ./packages/sdk-react
    COPY ./packages/mui-theme           ./packages/mui-theme
    COPY ./packages/create-keyban-app   ./packages/create-keyban-app
    COPY ./packages/tsconfig.base.json  ./packages/tsconfig.base.json

    RUN pnpm -r build

sdk-release-ga:
    FROM +sdk-build
    RUN apt-get --quiet update > /tmp/log 2>&1 || { cat /tmp/log; exit 1; }
    RUN apt-get --quiet install --yes python3 > /tmp/log 2>&1 || { cat /tmp/log; exit 1; }
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

    RUN pnpm install --silent

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

    RUN pnpm install --silent
    RUN pnpm -r lint

test:
    FROM +sdk-build
    COPY ./apps ./apps
    RUN pnpm install --silent
    RUN pnpm -r build
    RUN pnpm -r test

build:
    ARG --required app
    FROM +app-base --app=${app}
    RUN pnpm --filter ${app} build

dist:
    ARG --required app
    FROM +build --app="${app}"
    SAVE ARTIFACT --keep-ts /app/apps/${app}/dist

docker:
    FROM ../+sws
    COPY ./sws.toml /
    WORKDIR /public
    CMD static-web-server --config-file /sws.toml --page-fallback /public/index.html
    ARG --required app
    COPY --keep-ts (+dist/dist/ --app="${app}") /public/
    ARG --required ref
    ARG extra_ref
    SAVE IMAGE --push ${ref} ${extra_ref}

create-keyban-app:
    FROM +sdk-build
    RUN apt update && apt install -y jq
    RUN cd /app/packages/create-keyban-app && node index.js ./../../apps/create-keyban-app-dev --pm pnpm
    RUN cd /app/apps/create-keyban-app-dev && \
        pnpm remove @keyban/sdk-react && \
        jq '.dependencies["@keyban/sdk-react"] = "workspace:*"' package.json > tmp.json && \
        mv tmp.json package.json && \
        pnpm install --silent
    RUN cd /app/apps/create-keyban-app-dev && sed -i 's|const API_URL = "https://api.beta.keyban.io";|const API_URL = "https://api.keyban.localtest.me";|' /app/apps/create-keyban-app-dev/src/config.ts
    RUN cd /app/apps/create-keyban-app-dev && sed -i 's|chain: KeybanChain.PolygonAmoy,|chain: KeybanChain.EthereumAnvil,|' /app/apps/create-keyban-app-dev/src/config.ts
    SAVE ARTIFACT /app/apps/create-keyban-app-dev AS LOCAL ./apps/create-keyban-app-dev
