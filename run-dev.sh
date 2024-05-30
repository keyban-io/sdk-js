#!/bin/bash

pnpm base dev &

sleep 5

pnpm native dev &
pnpm react dev
