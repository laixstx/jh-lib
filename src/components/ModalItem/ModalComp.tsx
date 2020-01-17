import {Modal, Spin} from 'antd';
import React from 'react';
import {isEmpty, omit} from 'lodash-es';
import {JhConsumerProps} from "../Config";
import {ConfigConsumer} from "antd/es/config-provider";
import {ModalProps} from 'antd/es/Modal'
export interface ModalCompProps extends ModalProps{
    /**
     * visible Boolean 是否显示
     * */
    visible?: boolean;// 是否显示
    /**
     * loading Boolean 是否正在加载
     * */
    loading?: boolean; // 是否正在加载
    /**
     * title String 标题
     * */
    title?: string;
    /**
     * action  自定义操作按钮
     * */
    action?: any; // 自定义操作按钮
    /**
     * isShowDetail Loading 详情加载中
     * */
    isShowDetail?:boolean;
};

class ModalComp extends React.Component<ModalCompProps, any> {
    modal = (context: JhConsumerProps)=>{
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
    };

    render() {
        return (
            <ConfigConsumer>
                {this.modal}
            </ConfigConsumer>
        )
    }
}


export default ModalComp;
