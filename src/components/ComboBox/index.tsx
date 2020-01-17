import React, { Component } from 'react';
import { AutoComplete, Select } from 'antd';
import {isEmpty, isFunction, map} from 'lodash-es';
// import { connect } from 'dva';
// import { abortFetch, newAbortCtrl } from '@/utils/request';
// import { formatMsgByCn, myFormatMessage } from '@/utils/localeUtils';

import {ConfigConsumer} from 'antd/es/config-provider';
import {JhConsumerProps} from '../Config';

const { Option } = Select;

// @connect(({ global }) => ({
//   global,
// }))
export interface ComboProps extends JhConsumerProps{
  /** primaryKey 默认值 code
   *
   * */
  primaryKey?: any;
  /** nameKey 默认值 name
   *
   * */
  nameKey?: any;
  /** comboType 枚举类型
   *
   * */
  comboType?: string; // 枚举类型
  /** nativeProps Select 组件的属性 object
   *
   * */
  nativeProps?: any; // Select 组件的属性
  /** compData 主数据 数组对象
   *
   * */
  compData?: Array<any>;
  /** visible 是否显示
   *
   * */
  visible?: boolean;
  /** onDataLoad 数据加载之后的回调
   *
   * */
  onDataLoad?: Function; // 数据加载之后的回调
  /** needOptionLocale option 的值是否需要进行国际化处理
   *
   * */
  needOptionLocale?: boolean; // option 的值是否需要进行国际化处理
  /** onChange 选择下拉Select 后的回调
   *
   * */
  onChange?:Function;
  /** style Select 组件的样式
   *
   * */
  style?: any;
};

export interface stateProps {
  value: string;
  loading: boolean;
  list:Array<any>;
}

class ComboBoxProps extends Component<ComboProps,stateProps> {
  static defaultProps = {
    primaryKey: 'code',
    nameKey: 'name',
    visible: true,
  };
  // 返回一个对象来更新 state
  static getDerivedStateFromProps(nextProps: any) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }
  abortCtrl?: any = {};

  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '',
      loading: false,
      list:[],
    };
  }

  componentDidMount() {
    const { service, onDataLoad,request } = this.props;
    const $this = this;
    if (service&&isFunction(service.fetchFunc)) {
    this.setState({ loading: true }, () => {
      $this.abortCtrl = request&&request.newAbortCtrl();
      service.fetchFunc().then((rsp: any) => {
        if (isFunction(onDataLoad)) {
          // @ts-ignore
          onDataLoad(rsp);
        }
        $this.setState({ loading: false,list:rsp });
      });
    });
    }
  }

  componentWillUnmount() {
    let {request} = this.props;
    request&&request.abortFetch(this.abortCtrl);
  }

  handleChange(value: any) {

    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value);
  }

  triggerChange = (changedValue: any) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };

  renderSel() {
    const { style,localeUtils, primaryKey, nameKey, nativeProps = {}, compData, needOptionLocale } = this.props;

    let optData = [];
    if (compData) {
      optData = compData;
    } else if (!isEmpty(this.state.list)) {
      optData = this.state.list;
    }
    const styleO = style || nativeProps.style || {};
    let placeHolder = (localeUtils&&localeUtils.myFormatMessage('comp.select.placeholder')) || '请选择';
    return (
      <Select value={this.state.value}
              onChange={this.handleChange.bind(this)}
              loading={this.state.loading}
              {...nativeProps}
              style={{ minWidth: '100px', fontSize:13, ...styleO }}
      >
        <Option value="">{placeHolder}</Option>
        {map(optData, (opt: any, oK) => {
          let showName = needOptionLocale ? localeUtils&&localeUtils.formatMsgByCn(opt[nameKey]) : opt[nameKey];
          return <Option key={oK} value={opt[primaryKey]} title={showName}>
            {showName}
          </Option>
        })}
      </Select>
    );
  }

  render() {
    let visible = (this.props.visible===false ||this.props.visible===true)?this.props.visible:true;
    if (!visible) return null;
    return this.renderSel();
  }
}
export default class ComboBox extends React.Component{
  combox = (context: JhConsumerProps)=>{
    return (
        <ComboBoxProps
            {...context}
            {...this.props}
        />
    )
  };

  render(){
    return (
        <ConfigConsumer>
          {this.combox}
        </ConfigConsumer>
    )
  }

};
