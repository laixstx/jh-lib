import React from 'react';
import {Icon} from 'antd';
import {IconProps} from 'antd/es/Icon'

/**
 * 个性化的属性
 */
export interface BtIconProps {
    // isIconFont?:false,
}

export default class BtIcon extends React.Component<BtIconProps & IconProps> {

    render(): React.ReactNode {
        return  <Icon {...this.props}/>;
    }
}



export class BtIcon_ extends React.Component<BtIconProps> {
    render(): React.ReactNode {
        return null;
    }
}