import React from 'react';
import {Row,Col} from 'antd';
import {ColProps} from 'antd/es/col'
import {RowProps} from 'antd/es/row'

/**
 * 个性化的属性
 */
export interface BtRowProps {
    // isIconFont?:false,
}

export  class BtRow extends React.Component<BtRowProps & RowProps> {

    render(): React.ReactNode {
        return  <Row {...this.props}/>;
    }
}



export class BtRow_ extends React.Component<BtRowProps> {
    render(): React.ReactNode {
        return null;
    }
}
//col
export interface BtColProps {
    // isIconFont?:false,
}

export  class BtCol extends React.Component<BtColProps & ColProps> {

    render(): React.ReactNode {
        return  <Col {...this.props}/>;
    }
}


export class BtCol_ extends React.Component<BtColProps> {
    render(): React.ReactNode {
        return null;
    }
}