#!/usr/bin/env bash

set -e

pnpm build

rsync \
  -az \
  --delete \
  -e "ssh -p 8022" \
  dist/ \
  192.168.0.12:~/lights-dashboard/

echo "Dashboard deployed."
