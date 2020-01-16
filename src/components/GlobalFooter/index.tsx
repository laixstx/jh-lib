import * as React from 'react';
import classNames from 'classnames';
import styles from './index.module.less'

export interface IGlobalFooterProps {
    /**
     * 链接
     */
    links?: Array<{
        key?: string;
        title: React.ReactNode;
        href: string;
        blankTarget?: boolean;
    }>;
    /**
     * copyright（版权）
     */
    copyright?: React.ReactNode;
    /**
     * 一些样式
     */
    style?: React.CSSProperties;
}


export default class GlobalFooter extends React.Component<IGlobalFooterProps, any> {
    constructor(props: IGlobalFooterProps) {
        super(props)
    }

    render(): React.ReactNode {
        let {links, copyright, style} = this.props;
        const clsString = classNames(styles.globalFooter, style);
        return (
            <footer className={clsString}>
                {links && (
                    <div className={styles.links}>
                        {links.map(link => (
                            <a
                                key={link.key}
                                title={link.key}
                                target={link.blankTarget ? '_blank' : '_self'}
                                href={link.href}
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>
                )}
                {copyright && <div className={styles.copyright}>{copyright}</div>}
            </footer>
        );
    }
}
