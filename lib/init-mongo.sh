#!/bin/bash
set -e

if [ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && [ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ] && [ -n "${MONGO_USERNAME:-}" ] && [ -n "${MONGO_PASSWORD:-}" ]; then
mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD<<EOF
db = db.getSiblingDB('$MONGO_DATABASE')
use $MONGO_DATABASE
db.createUser({
  user: '$MONGO_USERNAME',
  pwd: '$MONGO_PASSWORD',
  roles: [
    {
      role: 'readWrite',
      db: '$MONGO_DATABASE',
    }
  ],
})
db.createCollection('assets', { capped: false })
db.assets.insert([
  {
    name: '@org/asset1',
    version: '0.1.0',
  },
  {
    name: '@org/asset2',
    version: '0.1.0',
  },
  {
    name: '@org/asset3',
    version: '0.1.0',
  },
])

EOF
else
    exit 403
fi
