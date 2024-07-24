#!/bin/bash

pnpm --filter sdk-base dev &

sleep 5

pnpm --filter sdk-react-native dev &
pnpm --filter sdk-react dev &

sleep 2
