import {IBundleOptions} from 'father'

// @ts-ignore
const options: IBundleOptions = {
    // entry: 'src/index.tsx',
    file: 'beast',
    esm: {
        type: 'rollup'
    },
    cjs: 'rollup',
    // @ts-ignore
    doc: {
        // themeConfig: { mode: 'dark' },
        dest: '/docs',
        base: '/docs',
        // @ts-ignore
        version: '1.2.0'
    },
    // 是否把 helper 方法提取到 @babel/runtime 里。只对 esm 有效。官网：https://babeljs.io/docs/en/babel-runtime
    runtimeHelpers: true,
    extraBabelPlugins: [ // 配置 babel-plugin-import 按需加载 antd
        ['babel-plugin-import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }],
    ],
};

export default options;