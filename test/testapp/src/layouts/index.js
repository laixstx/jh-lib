import React from "react";
import {GlobalProvider} from "../../../../src";
import * as localeUtils from '@/utils/localeUtils'
import styles from './index.css';

console.log(localeUtils)

function BasicLayout(props) {

  return (
    <GlobalProvider localeUtils={localeUtils}>
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to umi!</h1>
        {props.children}
      </div>
    </GlobalProvider>
  );
}

export default BasicLayout;
