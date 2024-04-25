VERSION 0.8

node:
    FROM node:20.12-alpine3.19
    ENV PNPM_HOME="/pnpm"
    ENV PATH="$PNPM_HOME:$PATH"
    RUN corepack enable pnpm

USEPNPM:
    FUNCTION
    RUN corepack use pnpm@9.0.6
