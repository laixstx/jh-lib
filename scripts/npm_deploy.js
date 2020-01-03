let pJson = require('../package.json');
let fs = require('fs');
let path = require('path');
let child = require('child_process');
let rootDir = path.resolve(__dirname, '../');

// console.log(rootDir);

let compDir = path.resolve(rootDir, 'src/components');

if (fs.existsSync(compDir)) {
    const files = fs.readdirSync(compDir);
    let writeStr = ''; // 用于保存组件的名称

    files.forEach((item) => {
        const stat = fs.statSync(path.join(compDir, item));
        // console.log(item, stat);
        if (stat.isDirectory()) { // 是目录的话，说明是组件
            writeStr += `export { default as ${item} } from './components/${item}';\n`;
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

// 改变版本号
let versionArr = pJson.version.split('.');
let verLen = versionArr.length;
let finalNum = !isNaN(parseInt(versionArr[verLen - 1])) ? parseInt(versionArr[verLen - 1]) + 1 : 1;
let newPJson = {...pJson};
newPJson.version = `${versionArr.slice(0, verLen - 1).join('.')}.${finalNum}`;

function updateVersion(isNew) {
    console.log('>>> 修改 package.json version');

    const newPckFile = fs.openSync(path.join(rootDir, 'package.json'), 'w');
    const wStat = fs.writeFileSync(newPckFile, JSON.stringify(isNew ? newPJson : pJson));
    fs.closeSync(newPckFile);

    if (wStat) {
        console.log('>>> 修改失败：', wStat);
        process.exit();
    } else {
        console.log('>>> 修改成功！');
    }
}


// 构建 es

console.log('>>> 开始构建 es');
updateVersion(true);
child.exec(`sh ${__dirname}/es_build.sh`, (err, sto) => {
    console.log(sto);

    if (err) {
        console.log('>>> 构建 es 失败：', err);
        updateVersion(false); // 恢复 package.json 的修改
        process.exit();

    } else {
        console.log('>>> 构建 es 成功！');
        // npm 发布
        console.log('>>> 开始发布 npm');
        child.exec(`sh ${__dirname}/npm_pub.sh`, (err, sto) => {
            console.log(sto);

            if (err) {
                console.log('>>> 发布 npm 失败：', err);
                updateVersion(false); // 恢复 package.json 的修改
                process.exit();
            }

            console.log('>>> 发布 npm 成功！');
        });
    }
});