import {Modal, Spin} from 'antd';
import React from 'react';
import {isEmpty, omit} from 'lodash-es';
import {JhConsumerProps} from "../Config";
import {ConfigConsumer} from "antd/es/config-provider";

export interface ModalCompProps {
    /**
     * visible Boolean 是否显示
     * */
    visible: false;// 是否显示
    /**
     * loading Boolean 是否正在加载
     * */
    loading: false; // 是否正在加载
    /**
     * title String 标题
     * */
    title: '';
    /**
     * action  自定义操作按钮
     * */
    action: null; // 自定义操作按钮
    /**
     * onOk Function 点击确认后的回调
     * */
    onOk: null; // 点击确认后的回调
    /**
     * onCancel Function 点击取消后的回调
     * */
    onCancel: null; // 点击取消后的回调
    /**
     * 是否显示详情
     * */
    isShowDetail?: boolean
};

class ModalComp extends React.Component<ModalCompProps, any> {
    modal = (context: JhConsumerProps) => {
        const {action, loading} = this.props;
        const moreProps: any = {
            ...omit(this.props, ['action', 'loading']),
        };
        if (!isEmpty(action)) {
            moreProps.footer = action;
        }

        return (
            <Modal
                visible={this.props.isShowDetail}
                confirmLoading={loading}
                keyboard={false}
                maskClosable={false}
                {...moreProps}
            >
                <Spin delay={300} spinning={loading}>
                    {
                        this.props.children
                    }
                </Spin>
            </Modal>
        );
    }

    render() {
        return (
            <ConfigConsumer>
                {this.modal}
            </ConfigConsumer>
        )
    }
}


export default ModalComp;
