import React from 'react';
import {Spin} from 'antd';
import {SpinProps} from 'antd/es/Spin'
import styles from './index.module.less'

/**
 * 个性化的属性
 */
export interface PageLoadingProps {
    // /**
    //  * 你的个性化属性
    //  */
    // tt?: string
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
    
      render():React.ReactNode {
        return (
          <div className={'page-loading'}  style={{ paddingTop: 100, textAlign: 'center' }}>
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