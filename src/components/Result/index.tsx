import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './index.module.less';

export interface IResultProps {
  /**
   * className 属性
   */
  className?: string;
  /**
   * 类型，不同类型自带对应的图标
   */
  type: 'success' | 'error' | 'info';
  /**
   * 标题
   */
  title: React.ReactNode;
  /**
   * 结果描述
   */
  description?: React.ReactNode;
  /**
   * 补充信息，有默认的灰色背景
   */
  extra?: React.ReactNode;
  /**
   * 操作建议，推荐放置跳转链接，按钮组等
   */
  actions?: React.ReactNode;
  /**
   * 样式
   */
  style?: React.CSSProperties;
}

export default class Result extends React.Component<IResultProps, any> {
  render(): React.ReactNode {
    const {
      className,
      type,
      title,
      description,
      extra,
      actions,
      children,
      ...restProps
    } = this.props;

    const iconMap = {
      error: <Icon className={styles.error} type="close-circle" theme="filled" />,
      success: <Icon className={styles.success} type="check-circle" theme="filled" />,
      info: <Icon className={styles.info} type="info-circle" theme="filled" />,
    };
    const clsString = classNames(styles.result, className);
    return (
        <div className={clsString} {...restProps}>
          <div className={styles.icon}>{iconMap[type]}</div>
          <div className={styles.title}>{title}</div>
          {description && <div className={styles.description}>{description}</div>}
          {extra && <div className={styles.extra}>{extra}</div>}
          {actions && <div className={styles.actions}>{actions}</div>}
          {children}
        </div>
    );
  }
}
