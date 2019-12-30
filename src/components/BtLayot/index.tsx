import React from 'react';
import {Layout} from 'antd';
import {LayoutProps} from 'antd/es/layout'

/**
 * 个性化的属性
 */
export interface BtLayoutProps {
    // /**
    //  * 你的个性化属性
    //  */
    // tt?: string
}

export default class BtButton extends React.Component<BtLayoutProps & LayoutProps> {

    static Sider = Layout.Sider;
    static Header = Layout.Header;
    static Footer = Layout.Footer;
    static Content  = Layout.Content;

    render(): React.ReactNode {
        return <Layout {...this.props}/>;
    }
}

export class BtLayout_ extends React.Component<BtLayoutProps> {
    render(): React.ReactNode {
        return null;
    }
}