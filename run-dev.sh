#!/bin/bash

pnpm base dev &

sleep 5

pnpm native dev &
pnpm react dev &

sleep 2

pnpm web dev
