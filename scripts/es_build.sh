#!/bin/sh
yarn build --esm=babel
yarn build --esm
cp -r ./dist/components/* ./es/components/
cp -r ./dist/index.d.ts ./es/
rm -rf ./es/docz.less ./dist/