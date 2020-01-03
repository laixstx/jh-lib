import React from 'react';
import {Button} from 'antd';
import {ButtonProps} from 'antd/es/button'
import styles from './index.module.less'

/**
 * 个性化的属性
 */
export interface BtButtonProps {
    // /**
    //  * 你的个性化属性
    //  */
    // tt?: string
}

export default class BtButton extends React.Component<BtButtonProps & ButtonProps> {

    static Group = Button.Group;

    render(): React.ReactNode {
        return <Button className={styles.primary} {...this.props}/>;
    }
}

export class BtButton_ extends React.Component<BtButtonProps> {
    render(): React.ReactNode {
        return null;
    }
}