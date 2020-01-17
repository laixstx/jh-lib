import React, { Component } from 'react';
import { Button, Divider, Empty, Icon, Input, Select, Spin } from 'antd';
import { find, isEmpty, map, isFunction, isArray, omit, pick, isNumber } from 'lodash-es';
import { abortFetch, newAbortCtrl } from '@/utils/request';
import { getRandomKey, getStorage, isObjectValEqual, removeStorage, setStorage } from 'jh-utils';
import { appConfig } from '@/globalConfig';
import { connect } from 'dva';
import keyCodes from '@/keyCodes';
import ChooseComp from '../ChooseComp';
import styles from './index.less';
import ButtonComp from '../ButtonComp';
import { isAuthMenuByConfig } from '@/components/SiderMenu/SiderMenuUtils';
import { formatMsgByCn, myFormatMessage } from '@/utils/localeUtils';
import GlobalProvider from "../GlobalProvider";
import {JhConsumerProps} from "../Config";

const { Option } = Select;
const InputGroup = Input.Group;

export interface OBoxProps {
  displayName: 'ObjectBox',
  appCode: '', // （必要）String 对象数据的 appCode
  dispatch: null, // Function 触发出发 Action
  compData: [], // Array 列表数据
  nativeProps: {
    // placeholder:'请选择'
  }, // Object Select 组件的属性
  primaryKey: 'id',
  nameKey: 'name',
  renderItem: null, // Function 自定义 Option 中的文本显示
  renderOptionText: null, // Function 自定义 Option 中的 text 属性值
  visible: true,
  style: {},
  onDataLoad: null, // Function 数据加载之后的回调
  quickAdd: true, // Boolean
  fetchInMount: true, // Boolean componentDidMount 的时候发请求
  forceReqInMount: false,
  fetchParams: {}, // Object 发请求的额外参数
  needMenu: false,
  disabled: false,
}
export interface stateProps {
  loading: boolean;
}
export class ObjectBoxProps extends Component<OBoxProps, stateProps> {

  static defaultProps = {
    displayName: 'ObjectBox',
    appCode: '', // （必要）String 对象数据的 appCode
    dispatch: null, // Function 触发出发 Action
    compData: [], // Array 列表数据
    nativeProps: {
      // placeholder:'请选择'
    }, // Object Select 组件的属性
    primaryKey: 'id',
    nameKey: 'name',
    renderItem: null, // Function 自定义 Option 中的文本显示
    renderOptionText: null, // Function 自定义 Option 中的 text 属性值
    visible: true,
    style: {},
    onDataLoad: null, // Function 数据加载之后的回调
    quickAdd: true, // Boolean
    fetchInMount: true, // Boolean componentDidMount 的时候发请求
    forceReqInMount: false,
    fetchParams: {}, // Object 发请求的额外参数
    needMenu: false,
    disabled: false,
  };
  // 返回一个对象来更新 state
  static getDerivedStateFromProps(nextProps: any) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const { primaryKey, nameKey } = nextProps;
      const value = nextProps.value || {};
      const v = {};
      v[primaryKey] = value[primaryKey] || '';
      v[nameKey] = value[nameKey] || '';
      return v;
    }
    return null;
  }

  defaultFinderConfig = {
    actionType: 'global/findByFinderCode',
    showValueFields: 'name',
    optionTextFields: 'code;name',
    detailUrl: '',
    listUrl: '',
  };

  constructor(props: any) {
    super(props);
    const { primaryKey, nameKey } = props;
    const value = props.value || {};
    const v = {};
    v[primaryKey] = value[primaryKey] || '';
    v[nameKey] = value[nameKey] || '';
    this.state = {
      loading: false,
      ...v,
    };

    // 获取 @/appConfig 中的配置
    const { appCode } = props;
    this.configObj = find(appConfig, (v) => {
      return appCode === v.finderCode;
    }) || {};
    this.finderConfig = !isEmpty(this.configObj.finderConfig) ?
      this.configObj.finderConfig
      : this.defaultFinderConfig;
    this.authConfig = !isEmpty(this.configObj.authConfig) ?
      this.configObj.authConfig
      : {};

    // 用于设置下拉框的最小宽度
    this.ddRef = React.createRef();
    this.ddProps = {};
    this.loopTimers = []; // 用于存储计时器
    // 分页的页码
    this.pageNo = this.props.initialPageNo || 1;
  }

  componentDidMount() {
    const { compData, global, appCode, onDataLoad, fetchInMount, forceReqInMount } = this.props;
    if (fetchInMount) {
      let storageKey = `CHANGED_${this.configObj.modelName}`;
      let dataChangedObj = getStorage(storageKey);
      // 如果数据在新窗口发生变化，则更新数据
      if (dataChangedObj && isEmpty(dataChangedObj[window.CODE])) {
        dataChangedObj[window.CODE] = '1';
        setStorage(storageKey, dataChangedObj);
        // removeStorage(storageKey);
        // alert('dataChanged');
        // 刷新数据
        this.pageNo = 1;
        this.fetchData(true);

      } else {
        const data = global[appCode];

        if ((isEmpty(compData) && isEmpty(data)) || forceReqInMount) {
          this.fetchData(forceReqInMount);

        } else if (isFunction(onDataLoad)) {
          onDataLoad(!isEmpty(compData) ? compData : data);
        }
      }
    }
    this.props.onRef && this.props.onRef(this);

    if (this.ddRef.current && this.ddRef.current.offsetWidth < 150) {
      const ddProps = {};
      // console.log('>>> this.ddRef.current.offsetWidth', this.ddRef.current.offsetWidth);
      // this.ddRef.current.offsetWidth
      ddProps.dropdownMatchSelectWidth = false;
      ddProps.dropdownStyle = { width: 150 };
      this.ddProps = ddProps;
      this.setState({ randomKey: getRandomKey() });
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.initialPageNo !== this.props.initialPageNo) {
      this.pageNo = nextProps.initialPageNo;
    }

    return (!isObjectValEqual(nextProps, this.props) || !isObjectValEqual(nextState, this.state));
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('cdup')
    // console.log('>>> object', this.configObj.modelName, this.props.global.dataChangingModels);
    // // 如果此模块的数据在外部有更新，则刷新数据
    // if (this.props.global.dataChangingModels[this.configObj.modelName]) {
    //   this.props.dispatch({
    //     type: 'global/deleteDataChangingModals',
    //     payload: {
    //       modelName: this.configObj.modelName,
    //     },
    //   });
    //   this.pageNo = 1;
    //   this.fetchData(true);
    // }

    let storageKey = `CHANGED_${this.configObj.modelName}`;
    let dataChangedObj = getStorage(storageKey);
    // 如果数据在新窗口发生变化，则更新数据
    if (dataChangedObj && isEmpty(dataChangedObj[window.CODE])) {
      dataChangedObj[window.CODE] = '1';
      setStorage(storageKey, dataChangedObj);
      // removeStorage(`CHANGED_${this.configObj.modelName}`);
      // alert('dataChanged');
      // 刷新数据
      this.pageNo = 1;
      this.fetchData(true);
    }
  }

  componentWillUnmount() {
    abortFetch(this.abortCtrl);
    // 清空计时器
    this.loopTimers.map((timer) => {
      clearInterval(timer);
    });
  }

  fetchData(forceReq = false) {
    const { dispatch, appCode, onDataLoad, asyncReqFunc } = this.props;

    if (asyncReqFunc) {
      asyncReqFunc(forceReq, this.pageNo);
    } else {
      const { fetchParams } = this.props;
      const $this = this;
      if (dispatch && appCode && !(this.state.loading || this.props.loading === true)) {
        const actionType = this.finderConfig.actionType || this.defaultFinderConfig.actionType;
        this.setState({ loading: true }, () => {
          $this.abortCtrl = newAbortCtrl();
          const payload = {
            finderCode: appCode,
            signal: $this.abortCtrl.signal,
            ...fetchParams,
          };
          // 异步请求的 api
          if (this.finderConfig.reqApi) {
            payload.reqApi = this.finderConfig.reqApi;
          }

          dispatch({
            type: actionType,
            payload,
          }).then((rsp) => {
            if (isFunction(onDataLoad)) {
              onDataLoad(rsp && 200 === rsp.status && isArray(rsp.data) ? rsp.data : []);
            }
            $this.setState({ loading: false });
          });
        });
      }
    }
  }

  /**
   * 判断是否可以发请求
   * @returns {*|string|null}
   */
  isCanFetch() {
    return ((this.props.dispatch && this.props.appCode) || this.props.asyncReqFunc);
  }

  /**
   * 点击下拉框时，如果值为空，则刷新数据
   */
  handleClickSelect() {
    const { compData, global, appCode } = this.props;
    const data = global[appCode];

    if (isEmpty(compData) && isEmpty(data)) {
      this.fetchData(true);
    }
  }

  handleFilter(inputVal: any, opt: any) {
    if ('undefined' !== typeof opt.props.isempty) return true;

    inputVal = `${inputVal || ''}`.toLocaleLowerCase();
    const text = `${opt.props.text || ''}`.toLocaleLowerCase();
    // console.log('inputVal', inputVal, 'text', text);
    let isOk = -1 !== text.indexOf(inputVal);

    if (!isOk && opt.props.title) {
      const title = `${opt.props.title || ''}`.toLocaleLowerCase();
      // console.log('inputVal', inputVal, 'text', text);
      isOk = -1 !== title.indexOf(inputVal);
    }
    if (!isOk && opt.props.code) {
      const code = `${opt.props.code || ''}`.toLocaleLowerCase();
      isOk = -1 !== code.indexOf(inputVal);
    }
    if (!isOk && opt.props.spellcode) {
      const spellCode = `${opt.props.spellcode || ''}`.toLocaleLowerCase();
      isOk = -1 !== spellCode.indexOf(inputVal);
    }
    return isOk;
  }

  handleChange(value: any) {
    // console.log('value', value);
    const { primaryKey, nameKey, global, appCode } = this.props;
    const compData = !isEmpty(this.props.compData) ? this.props.compData : global[appCode] || [];
    const data = find(compData, (v) => (v[primaryKey] == value));
    if (isEmpty(data)) {
      const emptyObj = {};
      emptyObj[primaryKey] = '';
      emptyObj[nameKey] = '';
      if (!('value' in this.props)) {
        this.setState(emptyObj);
      }
      this.triggerChange(null);
      return false;
    }
    const nextState = {
      ...data,
    };

    if (!('value' in this.props)) {
      this.setState(nextState);
    }
    this.triggerChange(nextState);
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };

  onInputKeyDown(e: any) {
    let keyCode = e.keyCode || e.which || e.charCode;
    // 禁止浏览器的 F5 刷新，触发组件的刷新方法
    if (keyCodes.f5 === keyCode) {
      e.preventDefault();
      this.fetchData(true);
    }
  };

  _openNewWindow(url: string, autoClose = true) {
    const $this = this;
    const newWin = window.openWin(url, '_blank') || {};

    newWin.IS_OPEN = true; // 标识该窗口是新打开的
    if (autoClose) {
      newWin.AUTO_CLOSE = true; // 用于新窗口关闭自己的逻辑
    }

    let loop = setInterval(() => {

      if (newWin.closed) {
        // alert('closed');
        clearInterval(loop);
      }
      let storageKey = `CHANGED_${this.configObj.modelName}`;
      let dataChangedObj = getStorage(storageKey);
      // 如果数据在新窗口发生变化，则更新数据
      if (dataChangedObj && isEmpty(dataChangedObj[window.CODE])) {
        dataChangedObj[window.CODE] = '1';
        setStorage(storageKey, dataChangedObj);
        // removeStorage(storageKey);
        // alert('dataChanged');
        // 刷新数据
        $this.pageNo = 1;
        $this.fetchData(true);
      }

    }, 1000);
    this.loopTimers.push(loop);
  }

  dropdownRender(menu: any) {
    const { dropdownFooter, loading, global } = this.props;
    const needReflesh = this.isCanFetch();
    let configObj = {};
    let detailUrl = ''; // 添加页面的路由， 用于点击 [+ 添加] 时打开新窗口
    let listUrl = ''; // 列表页面的路由， 用于点击 [查看所有] 时打开新窗口
    let hadListAuth = false; // 当前用户是否有 [查看所有] 权限

    if (this.props.quickAdd) { // 需要快速添加
      configObj = this.configObj;

      if (this.props.detailUrl) {
        detailUrl = this.props.detailUrl;

      } else if (!isEmpty(configObj)) {
        let tmpUrl = configObj.detailRoute || `${configObj.modelName}/detail`;
        detailUrl = `./#${tmpUrl}?animated=none`;
      }

      if (this.props.listUrl) {
        listUrl = this.props.listUrl;

      } else if (!isEmpty(configObj) && configObj.modelName) {
        listUrl = `./#${configObj.modelName}`;
      }

      const userInfo = global.userInfo || {};
      hadListAuth = isAuthMenuByConfig(this.authConfig, userInfo.resources || {});

      if (!hadListAuth) {
        listUrl = '';
      }

    }
    let addTxt = formatMsgByCn('添加');
    let appTxt = formatMsgByCn(configObj.cn);

    const ddFooter = dropdownFooter ? dropdownFooter : (
      isEmpty(detailUrl) && !needReflesh ? null :
        <>
          <Divider style={{ margin: 0 }}/>
          <div style={{ position: 'relative', padding: 6, height: '36px' }}>
            {
              !isEmpty(detailUrl) && (
                <ButtonComp btnType={'a'}
                            appConfigObj={configObj}
                            actionType={'save'}
                            onMouseDown={e => {
                              e.preventDefault();
                              this._openNewWindow(detailUrl);
                              // const newWin = window.open(detailUrl, '_blank');
                            }}
                            title={`${addTxt} ${appTxt || ''}`}
                            style={{ textAlign: 'left', display: 'inline-block', fontSize: 12 }}>
                  <Icon type="plus"/> {addTxt}
                </ButtonComp>
              )
            }
            {
              needReflesh && (
                <Button size={'small'}
                        title={`${myFormatMessage('crud.refresh')} (F5)`}
                        style={{ float: 'right', marginRight: !isEmpty(listUrl) ? 22 : 0 }}
                        onMouseDown={e => {
                          e.preventDefault();
                          this.pageNo = 1;
                          this.fetchData(true);
                        }}>
                  <Icon type="reload" spin={this.state.loading || loading === true}/>
                </Button>
              )
            }
            {
              !isEmpty(listUrl) && (
                <Button size={'small'}
                  // style={{ float: 'right' }}
                        title={myFormatMessage('comp.blank.view-all', { name: appTxt })}
                        className={styles.ddJumpBtn}
                        onMouseDown={e => {
                          e.preventDefault();
                          this._openNewWindow(listUrl, false);
                          // this.setState({ isShowModal: true });
                          // window.open(listUrl, '_blank');
                          // newWin.IS_OPEN = true; // 标识该窗口是新打开的，用于新窗口关闭自己的逻辑
                        }}>
                  <Icon type="double-right"/>
                </Button>
              )
            }
          </div>
        </>
    );
    const menuLen = menu.props.menuItems.length;
    // console.log('>>>', menu);
    return (
      <>
        <Spin spinning={this.state.loading || loading === true}>
          {menu}
          {
            'ObjectBox' === this.props.displayName ? null : (
              menuLen <= 1 && (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
              )
            )
          }
        </Spin>
        {ddFooter}
      </>
    );
  }

  getOptionProps(opt: any, oK: any) {
    const { primaryKey, nameKey, renderItem, renderOptionText } = this.props;
    let finderConfig = this.finderConfig;
    let text = '',
      optionText = '',
      title = '';

    // 值显示的字段
    if (isFunction(renderOptionText)) {
      text = renderOptionText(opt);
    } else {
      // 值显示的字段,';'号分隔
      if (finderConfig.showValueFields) {
        const fields = finderConfig.showValueFields.split(';');
        fields.forEach((v: any) => {
          text += opt[v] || '';
        });

      } else {
        text = opt[nameKey] || opt.code;
      }
    }

    if (isEmpty(text)) {
      text = opt.code || '';
    }

    // 下拉列表显示字段
    if (isFunction(renderItem)) {
      optionText = renderItem(opt) || opt.code;
      title = opt[nameKey] || opt.code;
    } else {
      // 下拉列表显示字段,';'号分隔
      if (finderConfig.optionTextFields) {
        const fields = finderConfig.optionTextFields.split(';');
        const len = fields.length;
        optionText = fields.map((v: any, k:number) => {
          title += opt[v] || '';
          if (k / 2 === 0) {
            return <span key={k} className={len > 1 ? 'text-gray' : ''}>{opt[v] || ''} </span>;
          } else {
            return opt[v] || '';
          }
        });
      } else {
        optionText = <>
          <span className={'text-gray'}>{opt.code}</span> {opt[nameKey]}
        </>;
      }
    }

    return {
      key: oK,
      value: opt[primaryKey],
      text,
      title,
      code: opt['code'],
      spellcode: opt['spellCode'],
      children: optionText,
    };
  }

  handleOk(checkedList) {
    const checkedItem = checkedList[0] || {};
    this.setState({ isShowModal: false }, () => {
      this.handleChange(checkedItem[this.props.primaryKey] || '');
    });
  }

  renderMain(opt = {}) {
    const { primaryKey, nameKey, nativeProps = {}, global, appCode, disabled } = this.props;
    const compData = !isEmpty(this.props.compData) ? this.props.compData : global[appCode] || [];
    const ddProps = this.ddProps;
    let placeHolder = myFormatMessage('comp.select.placeholder');
    return (
      <>
        <Select showSearch
                allowClear
                showArrow={!this.props.needMenu}
                value={isEmpty(compData) ? this.state[nameKey] : this.state[primaryKey]}
                filterOption={this.handleFilter.bind(this)}
                onDropdownVisibleChange={this.handleClickSelect.bind(this)}
                onChange={this.handleChange.bind(this)}
                onInputKeyDown={this.onInputKeyDown.bind(this)}
                loading={this.state.loading}
                {...nativeProps}
                style={{ fontSize: 13, ...(opt.style || {}) }}
                optionLabelProp={'text'}
                dropdownRender={this.dropdownRender.bind(this)}
                disabled={disabled}
                {...ddProps}
        >
          <Option value="" text={placeHolder}>{placeHolder}</Option>
          {map(compData, (opt, oK) => {
            const props = this.getOptionProps(opt, oK);
            return (
              <Option {...omit(props, ['children'])}>
                {props.children}
              </Option>
            );
          })}
        </Select>
        <div ref={this.ddRef}/>
      </>
    );
  }

  render() {
    if (!this.props.visible) return null;
    const { style, nativeProps = {} } = this.props;
    const styleO = style || nativeProps.style || {};
    const mainWidth = isNumber(styleO.width) ? styleO.width : `calc(${styleO.width ? styleO.width : '100%'} - ${this.props.needMenu ? '28px' : '0px'})`;

    const configObj = this.configObj;
    const chooseCompConfig = configObj.chooseConfig || {};

    return (
      <>
        <InputGroup compact={this.props.needMenu}>
          {this.renderMain({
            style: { ...styleO, minWidth: '100px', width: mainWidth },
          })}
          {
            this.props.needMenu && (
              <Button
                disabled={this.props.disabled}
                className={styles.menuBtn}
                onClick={() => {
                  this.setState({ isShowModal: true });
                }}>
                <Icon type="unordered-list"/>
              </Button>
            )
          }
        </InputGroup>
        {
          this.props.needMenu && (
            <ChooseComp
              visible={this.state.isShowModal}
              onOk={this.handleOk.bind(this)}
              onCancel={() => {
                this.setState({ isShowModal: false });
              }}
              mode={'single'}
              checkedList={[pick(this.state, ['id', 'code', 'name'])]}
              listApi={configObj.api ? configObj.api.listApi : ''}
              appCode={configObj.appCode}
              {...chooseCompConfig}
            />
          )
        }
      </>
    );
  }
}


export default class ObjectBox extends Component {
  OBox  =  (context: JhConsumerProps)=>{
    return (
        <ObjectBoxProps
            {...context}
            {...this.props}
        />
    )
  };
  render(){
    return (
        <GlobalProvider>
          {this.OBox}
        </GlobalProvider>
    )
  }
}
