import React from 'react';
import {Button} from 'antd';
import {ButtonProps} from 'antd/es/button'
import styles from './index.module.less'

/**
 * 个性化的属性
 */
export interface ButtonCompProps {
    // /**
    //  * 你的个性化属性
    //  */
    // tt?: string
}

export default class ButtonComp extends React.Component<ButtonCompProps & ButtonProps> {

    static Group = Button.Group;

    render(): React.ReactNode {
        return <Button className={styles.primary} {...this.props}/>;
    }
}

export class ButtonComp_ extends React.Component<ButtonCompProps> {
    render(): React.ReactNode {
        return null;
    }
}
