import {ConfigConsumerProps} from "antd/es/config-provider";

interface LocaleUtilsProps {
    formatMsgByCn: Function,
    myFormatMessage: Function
}

export interface GlobalProviderProps {
    localeUtils?: any;
    global?: any;
}

export type JhConsumerProps = ConfigConsumerProps & GlobalProviderProps;

/**
 * 组件的属性类型
 */
export const PROP_TYPES = {
    /**
     * 下拉框
     */
    SELECT: 'SELECT',
    /**
     * 下拉框，且可自定义输入
     */
    SELECT_INPUT: 'SELECT_INPUT',
    /**
     * 多选 下拉框
     */
    SELECT_MULTI: 'SELECT_MULTI',
    /**
     * 文本
     */
    TEXT: 'TEXT',
    /**
     * 数字
     */
    NUMBER: 'NUMBER',
    /**
     * 勾选
     */
    CHECKBOX: 'CHECKBOX',
};