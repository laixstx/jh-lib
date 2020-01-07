import React from 'react';
import {Switch} from 'antd';
import {SwitchProps} from 'antd/es/switch'
import styles from './index.module.less'
export interface SwitchCompProps{

}
export default class SwitchComp extends React.Component<SwitchCompProps & SwitchProps> {
    render(): React.ReactNode {
        return <Switch  {...this.props}/>;
    }
}
export class SwitchComp_ extends React.Component<SwitchCompProps> {
    render(): React.ReactNode {
        return null;
    }
}
