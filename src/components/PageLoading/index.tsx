import React from 'react';
import {Spin} from 'antd';
import {SpinProps} from 'antd/es/Spin'
import styles from './index.module.less'

export interface PageLoadingProps {
    /**
     * 延迟显示加载效果的时间（防止闪烁）
     */
    delay?: number,
    /**
     * 加载指示符
     */
    indicator?: React.ReactNode,
    /**
     * 组件大小
     */
    size?: string,
    /**
     * 是否为加载中状态
     */
    spinning?: boolean,
    /**
     * 当作为包裹元素时，可以自定义描述文案
     */
    tip?: string,
    /**
     * 包装器的类属性
     */
    wrapperClassName?: string
}

export default class PageLoading extends React.Component<SpinProps & PageLoadingProps> {
    /**
     * NProgress对象未知是哪个上下文所有
     */
    // componentDidMount():void {
    //     if ('undefined' !== typeof NProgress) {
    //       NProgress.start();
    //       NProgress.set(0.3);
    //       // NProgress.set(30000000);
    //     }
    //   }

    //   componentWillUnmount():void {
    //     if ('undefined' !== typeof NProgress) {
    //       NProgress.done();
    //     }
    //   }

    render(): React.ReactNode {
        return (
            <div className={'page-loading'} style={{paddingTop: 100, textAlign: 'center'}}>
                <Spin {...this.props} />
            </div>
        );
    }
}

export class PageLoading_ extends React.Component<PageLoadingProps> {
    render(): React.ReactNode {
        return null;
    }
}
