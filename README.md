# SDK Setup

Setting up the SDK/frontend part of the repo is divided into two parts, this is the result of
React Native not cooperating with monorepo solution such as PNPM.

## Main part

Main part is responsible for installing packages, building and linking SDKs and Web app.

1. `pnpm install` - install dependencies
2. `pnpm build` - build each package and link it

To empirically confirm that this part worked run `pnpm web dev` and in new tab
`pnpm web e2e:chrome`.

## Native part

Because of the reasons above we have to setup React Native app separately from pnpm packages.
`mobile-app` is using `yarn` and `yalc` to work properly.

To simply the whole flow there is a single command `pnpm prepare:native` to:

1. Install packages with `yarn`
2. Build iOS required packages
3. Link Keyban SDKs with `yalc link`

# SDK development

## Web development

1. `pnpm base dev`
2. `pnpm react dev`
3. `pnpm web dev`

## Native development

1. `pnpm base dev`
2. `pnpm native dev`
3. `pnpm ios:emu` or `pnpm android:emu`
