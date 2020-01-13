let fs = require('fs');
let path = require('path');
let rootDir = path.resolve(__dirname, '../');

// console.log(rootDir);

let compDir = path.resolve(rootDir, 'src/components');

if (fs.existsSync(compDir)) {
    const files = fs.readdirSync(compDir);
    let writeStr = ''; // 用于保存组件的名称

    files.forEach((item) => {
        const stat = fs.statSync(path.join(compDir, item));
        // console.log(item, stat);
        if (stat.isDirectory() && item !== 'locale') { // 是目录的话，说明是组件
            if('Config' === item) {
                writeStr += `export * from './components/${item}';\n`;
            } else {
                writeStr += `export { default as ${item} } from './components/${item}';\n`;
            }
        }
    });
    // console.log(files)

    // 更新 src/index.tsx 的内容
    if (fs.existsSync(path.join(rootDir, 'src'))) {
        const indexFile = fs.openSync(path.join(rootDir, 'src', 'index.tsx'), 'w');
        const wStat = fs.writeFileSync(indexFile, writeStr);
        fs.closeSync(indexFile);

        if (wStat) {
            console.log('>>> 写 src/index.tsx 失败：', wStat);
            process.exit();
        } else {
            console.log('>>> 写 src/index.tsx 成功！');
        }
    }
}