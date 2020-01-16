import React, {Component} from 'react';
import {Collapse, Icon, Popover, Tabs, Tag} from 'antd';
import styles from './index.module.less';
import {isObjectValEqual, sort} from 'jh-utils';
import {find} from 'lodash-es';

const {Panel} = Collapse;
const {TabPane} = Tabs;

interface ISiderTabbar {
    /**
     * 后端返回数据
     */
    compData?: Array<any>;
    /**
     * 动态参数
     */
    [propName: string]: any;
}

interface SubItem {
    /**
     * 标识
     */
    code?:string,
    /**
     * 名字
     */
    name?:string
}


export default class SiderTabbar extends Component<ISiderTabbar> {
    static defaultProps: any;
    state: any;

    constructor(props: ISiderTabbar) {
        super(props);
        this.state = this._getStateByProps(props);
    }

    componentDidUpdate(prevProps: Readonly<ISiderTabbar>, prevState: Readonly<{}>, snapshot?: any): void {

        if (!isObjectValEqual(prevProps, this.props)) {
            this.setState(this._getStateByProps(this.props));
        }
    }

    _getStateByProps(props: ISiderTabbar) {
        return {
            activeObj: props.defaultActiveObj,
            activeKey: props.defaultActiveObj ? props.defaultActiveObj.code : '',
            activeSubObj: props.defaultActiveSubObj,
            activeSubKey: props.defaultActiveSubObj ? props.defaultActiveSubObj.code : '',
        };
    }

    changeColl(activeKey: any) {
        let newState: ISiderTabbar = {activeKey};


        newState.activeObj = find(this.props.compData, (item) => (item && item.code === activeKey));

        if ('' === this.state.activeSubKey && newState.activeObj && newState.activeObj.dataList && newState.activeObj.dataList[0]) {
            newState.activeSubObj = newState.activeObj.dataList[0]
            newState.activeSubKey = newState.activeSubObj.code;
        }
        this.setState(newState, () => {
            this.props.onChange && this.props.onChange(this.state)
        });
    }

    changeSub(activeSubKey: any) {
        let activeSubObj;
        if (this.state.activeObj && this.state.activeObj.dataList) {
            activeSubObj = find(this.state.activeObj.dataList, (item) => (item && item.code === activeSubKey));
        }
        this.setState({activeSubKey, activeSubObj}, () => {
            // console.log('ss');
            this.props.onChange && this.props.onChange(this.state);
        });
    }

    render() {
        const compData = this.props.compData || [];

        const iconStyle = {color: '#1890FF', fontSize: 14};
        let tabH = document.body.offsetHeight - 164 - compData.length * 47;
        if (tabH < 47 * 4) {
            tabH = 47 * 4;
        }
        return (
            <div className={styles.siderWrap}>
                <Collapse
                    activeKey={this.state.activeKey}
                    onChange={this.changeColl.bind(this)}
                    className={'sider-tab'}
                    accordion
                    bordered={false}
                    expandIcon={({isActive}) => (isActive ? <Icon style={iconStyle} type="minus-square"/> :
                        <Icon style={iconStyle} type="plus-square"/>)}>
                    {
                        compData.map((item) => (
                            <Panel
                                header={(
                                    <>
                                        <span className={'ml8 fwb'}>{item.name}</span>
                                        {
                                            item.dataList && item.dataList.length > 0 && (
                                                <Tag color="red" className={styles.icon}>{item.dataList.length}</Tag>
                                            )
                                        }

                                    </>
                                )}
                                key={item.code}
                                className={styles.pancel}
                                disabled={!(item.dataList && item.dataList.length > 0)}
                            >
                                <Tabs
                                    activeKey={this.state.activeSubKey}
                                    onChange={this.changeSub.bind(this)}
                                    defaultActiveKey={`${item.dataList && item.dataList[0] ? item.dataList[0].code : ''}`}
                                    tabPosition={'left'}
                                    style={{height: tabH, width: '100%'}}>
                                    {
                                        item.dataList && item.dataList.length > 0 && (
                                            item.dataList.map((subItem:SubItem) => {
                                                // let name = `${subItem.code} ${subItem.name}`;
                                                // let needTip = name.length >= 12;
                                                return <TabPane tab={
                                                    <Popover content={`${subItem.code} ${subItem.name}`}
                                                             placement={'topLeft'}>
                                                        {subItem.name}
                                                    </Popover>
                                                } key={`${subItem.code}`}/>;
                                            })
                                        )
                                    }
                                </Tabs>
                            </Panel>
                        ))
                    }
                </Collapse>
            </div>
        );
    }
}

SiderTabbar.defaultProps = {
    defaultActiveObj: null,
    defaultActiveSubObj: null,
    compData: [],
    onChange: null,
};
