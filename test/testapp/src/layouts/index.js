import React from "react";
import {BtConfigProvider} from "../../../../src";
import * as localeUtils from '@/utils/localeUtils'
import styles from './index.css';

function BasicLayout(props) {

  return (
    <BtConfigProvider localeUtils={localeUtils}>
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to umi!</h1>
        {props.children}
      </div>
    </BtConfigProvider>
  );
}

export default BasicLayout;
