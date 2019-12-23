import React from 'react';
import {Typography} from 'antd';
import {TypographyProps} from 'antd/es/Typography'

/**
 * 个性化的属性
 */
export interface BtTypographyProps {
    // isIconFont?:false,
}
export default class BtTypography extends React.Component<BtTypographyProps & TypographyProps> {

    render(): React.ReactNode {
        return  <Typography {...this.props}/>;
    }
}



export class BtTypography_ extends React.Component<BtTypographyProps> {
    render(): React.ReactNode {
        return null;
    }
}