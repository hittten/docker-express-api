#!/usr/bin/env bash
set -e

echo "executing entrypoint"
node change_env.js ${DB_HOST} ${DB_USER} ${DB_PASS}

exec "$@"
