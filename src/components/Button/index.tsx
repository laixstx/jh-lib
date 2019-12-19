import React from 'react';
import {Button} from 'antd';
import {ButtonProps} from 'antd/es/button/index';
import classNames from 'classnames';
import styles from './index.module.less';

export interface BaseButtonProps extends ButtonProps {
}

export default class BtButton extends React.Component<BaseButtonProps> {

    render(): React.ReactNode {
        let className = classNames(this.props.className, styles.primary);

        return <Button {...{...this.props, className}}/>;
    }
}