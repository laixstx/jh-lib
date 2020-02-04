import React from 'react';
import {Button} from 'antd';
import {ButtonProps} from 'antd/es/button'
import styles from './index.module.less'
import {JhConsumerProps} from "../Config";
import GlobalConsumer from "../GlobalConsumer";

/**
 * 个性化的属性
 */
export interface ButtonCompProps {
    /**
     * 按钮文本
     */
    text?: string
}

export default class ButtonComp extends React.Component<ButtonCompProps & ButtonProps> {

    static Group = Button.Group;

    res = ({localeUtils}: JhConsumerProps) => {
        const {children, text, ...restProps} = this.props;
        const btnText = children || text || null;
        return <Button className={styles.primary} {...restProps}>{btnText}</Button>;
    };

    render(): React.ReactNode {
        return (
            <GlobalConsumer>
                {this.res}
            </GlobalConsumer>
        );
    }
}

export class ButtonComp_ extends React.Component<ButtonCompProps> {
    render(): React.ReactNode {
        return null;
    }
}
