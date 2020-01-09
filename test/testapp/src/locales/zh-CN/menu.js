import isArray from 'lodash-es/isArray';
import X from './menuX';
const menuArr = [];

function recursiveMenu(menuArr, distObj) {
  menuArr.forEach((menuItem) => {
    if (isArray(menuItem.key)) {
      menuItem.key.forEach((keyItem) => {
        let objKey = `menu.${keyItem.substr(1).replace(/\//g, '.')}`;
        distObj[objKey] = menuItem.name;
      });
    } else {
      let menuKey = menuItem.key;
      let objKey = `menu.${menuKey.substr(1).replace(/\//g, '.')}`;
      distObj[objKey] = menuItem.name;
    }

    if (isArray(menuItem.children)) {
      recursiveMenu(menuItem.children, distObj);
    }
  });
}

const menuKeysObj = {};
recursiveMenu(menuArr, menuKeysObj);

// console.log(menuKeysObj)

export default {
  ...menuKeysObj,

  ...X,
};
