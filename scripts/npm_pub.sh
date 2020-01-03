#!/bin/sh
npm config set registry https://registry.npmjs.org/
npm config ls
npm publish
npm config set registry http://registry.npm.taobao.org/