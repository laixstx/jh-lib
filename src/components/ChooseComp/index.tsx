import React, { Component } from 'react';
import { Button, Card, Checkbox, Col, Divider, Icon, Input, List, Menu, Row, Spin } from 'antd';
import {isArray, map, isFunction, find, findIndex, differenceBy, isEmpty} from 'lodash-es';
//import { connect } from 'dva';
import { reqGet } from '@/utils/request';
import { isObjectValEqual } from 'beast-utils';
//import { appCodes, appConfig } from '@/appConfig';
import styles from './index.less';
import ModalComp from '../ModalItem/ModalComp';
//import { formatMsgByCn, myFormatMessage } from '@/utils/localeUtils';
import {JhConsumerProps} from '../Config'
import {ConfigConsumer} from 'antd/es/config-provider'

const { Search, Group } = Input;

// @connect(({ global }) => ({
//   global,
// }))
/**
 * 选择组件
 * @type {{defaultSearchData: {}, mode: string, checkedList: Array, listApi: string, typeList: Array, typeAppCode: string, typeCode: string}}
 */
export interface ChooseCompFormProps {
  /**
   * fetchFunc Function 获取列表的方法，返回一个 promise，参数是 列表数组
   */
  fetchFunc: null, // Function 获取列表的方法，返回一个 promise，参数是 列表数组
  /**
   * listApi String 列表的 api 路径,
   */
  listApi: '', // String 列表的 api 路径,
  /**
   * typeCode String 获取分类数据接口（findByCode）的 code 字段,
   */
  typeCode: '', //String 获取分类数据接口（findByCode）的 code 字段,
  /**
   * typeAppCode String 获取分类数据接口（findByAppCode）的 appCode 字段,
   */
  typeAppCode: '', // String 获取分类数据接口（findByAppCode）的 appCode 字段,
  /**
   * appCode String 主数据的
   */
  appCode: '', // String 主数据的
  /**
   * defaultSearchData Object 默认的搜索条件
   */
  defaultSearchData: {}, //Object 默认的搜索条件
  /**
   * checkedList 已选中的数据数组
   */
  checkedList: [], // 已选中的数据数组
  /**
   * mode 选择模式，'multi'：多选；空值或其他值：单选
   */
  mode: 'multi', // 选择模式，'multi'：多选；空值或其他值：单选
  /**
   * showChecked Boolean 是否显示已选的数据
   */
  showChecked: true, // Boolean 是否显示已选的数据
};
class ChooseCompForm extends Component<ChooseCompFormProps, any> {

  constructor(props:ChooseCompFormProps) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      typeDataList: [],
      checkedList: props.checkedList || [], // 已选中的选项
    };
    this.searchData = {
      fuzzyMatch: 'code,name',
      search: '',
      current: 1,
      size: 10000,
      ...props.defaultSearchData,
    };
  }

  componentDidMount() {
    isFunction(this.props.onRef) && (this.props.onRef(this.props.refKey, this));
    let $this = this
    const {service: {typeGet}, comboType} = $this.props;
    if (!isEmpty(comboType)) {
      let dataAjax = {...comboType}
      if (isFunction(typeGet)) {
        typeGet(dataAjax).then((rsp: any) => {
          if (rsp && 200 === rsp.status && isArray(rsp.data) && rsp.data.length > 0) {
            //类型 typeList
            $this.searchData.category = rsp.data[0]['code'];
            this.setState({
              typeDataList: rsp.data
            }, () => $this.fetchList())
          }
        });
      }
    } else {
      $this.fetchList();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isObjectValEqual(prevProps, this.props)) {
      // console.log('update');

      if (prevProps.listApi !== this.props.listApi) {
        this.fetchList();
      }
      if (!isObjectValEqual(prevProps, this.props, ['checkedList'])) {
        console.log('isObjectValEqual checkedList');
        this.setState({
          checkedList: this.props.checkedList,
        });

      }

    }
  }

  getAjaxData() {
    return this.state.checkedList;
  }

//左边菜单栏点击和搜索点击发送的ajax请求
  fetchList() {
    const $this = this;
    if (this.props.listApi) {
      this.setState({loading: true}, () => {
        reqGet(this.props.listApi, this.searchData).then(rsp => {
          let list = [];
          if (rsp && 200 === rsp.status && rsp.data) {
            if (isArray(rsp.data)) {
              list = rsp.data;
            } else if (isArray(rsp.data.records)) {
              list = rsp.data.records;
            }
          }
          $this.setState({
            list,
            loading: false,
          });
        });
      });
    } else if (isFunction(this.props.fetchFunc)) {
      this.setState({loading: true}, () => {
        this.props.fetchFunc(this.searchData).then(dataList => {
          $this.setState({
            list: isArray(dataList) ? dataList : [],
            loading: false,
          });
        });
      });
    }
  }


  // 点击分类
  handleClickType(e: any) {
    // console.log('e', e);
    this.searchData.category = e.key;
    this.searchData.current = 1;
    this.fetchList();
  }

  // 触发搜索
  handleSearch(value: any) {
    this.searchData.search = value;
    this.fetchList();
  }

  handleChange(record: object) {
    // console.log(record);
    // const isChecked = e.target.checked;

    let isChecked = -1 === findIndex(this.state.checkedList, (v) => (v && v.id === record.id));
    let checkedList = [...this.state.checkedList];
    if (isChecked) {
      if ('multi' === this.props.mode) {
        checkedList.push(record);
      } else { // 单选
        checkedList = [record];
      }
    } else {
      if ('multi' === this.props.mode) {
        checkedList = checkedList.filter((v) => (v.id !== record.id));
      } else { // 单选
        checkedList = [];
      }
    }
    this.setState({
      checkedList,
    });
  }

  // 全选
  handleCheckAll() {
    const {list, checkedList} = this.state;
    const unCheckedList = differenceBy(list, checkedList, 'id');
    this.setState({
      checkedList: unCheckedList.concat(checkedList),
    });
  }

  // 反选
  handleCheckAllInstead() {
    const {list, checkedList} = this.state;
    const unCheckedList = differenceBy(list, checkedList, 'id');
    const withoutList = differenceBy(checkedList, list, 'id');

    this.setState({
      checkedList: unCheckedList.concat(withoutList),
    });
  }

  // 清空当前页
  handleCheckReset() {
    this.setState({
      checkedList: differenceBy(this.state.checkedList, this.state.list, 'id'),
    });
  }

  /**
   *  清空所有
   */
  resetAll() {
    this.setState({
      checkedList: [],
    });
  }

  render() {
    const {showChecked, config, localeUtils: {formatMsgByCn, myFormatMessage} }= this.props;
    const {checkedList, list, typeDataList} = this.state;
    const typeList = typeDataList || [];
    const dataSource = showChecked ? list : list.filter(v => (-1 === findIndex(this.props.checkedList, {id: v.id})));
    const configObj = config || {};

    const wrapH = document.body.offsetHeight - 280, cardHeadH = 50, cardBodyH = wrapH - cardHeadH;

    return (
        <Row type="flex" className={'bd1'} style={{height: wrapH}}>
          {typeList.length > 0 && (
              <Col span={4} className={'bdr1'}>
                <Menu
                    onClick={this.handleClickType.bind(this)}
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    style={{border: 'none'}}
                >
                  {
                    //左边菜单栏
                    map(typeList, (v) => (
                        <Menu.Item style={{margin: 0}} key={v.code}>{v.name}</Menu.Item>
                    ))
                  }
                </Menu>
              </Col>
          )}

          <Col span={typeList.length > 0 ? 20 : 24}>
            <Card
                size="small"
                style={{height: '100%'}}
                bordered={false}
                headStyle={{height: cardHeadH, display: 'flex'}}
                bodyStyle={{height: cardBodyH, overflowY: 'auto'}}
                type="inner"
                title={<Search
                    style={{width: 200, marginRight: 8}}
                    placeholder={myFormatMessage('comp.search.placeholder')}
                    onSearch={this.handleSearch.bind(this)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                    }}
                />}
                extra={
                  <>
                    {
                      'multi' === this.props.mode ?
                          <>
                            <a href='javascript:;' onClick={this.handleCheckAll.bind(this)}>
                              {myFormatMessage('crud.sel-all')}
                            </a>
                            <Divider type="vertical"/>
                            <a href='javascript:;' onClick={this.handleCheckAllInstead.bind(this)}>
                              {myFormatMessage('crud.un-sel')}
                            </a>
                            <Divider type="vertical"/>
                            <a href='javascript:;' style={{marginRight: configObj.modelName ? 50 : 0}}
                               onClick={this.handleCheckReset.bind(this)}>
                              {myFormatMessage('crud.sel-clear')}
                            </a>
                          </> :
                          null
                    }
                    {
                      configObj.modelName ? (
                          <Button size={'small'}
                                  className={styles.hRightBtn}
                                  title={myFormatMessage('comp.blank.view-all', {
                                    name: formatMsgByCn(configObj.cn) || '',
                                  })}
                                  onClick={e => {
                                    e.preventDefault();
                                    // window.open(`./#/${configObj.modelName}`, '_blank');
                                    window.openWin(`./#/${configObj.modelName}`, '_blank');
                                    // newWin.IS_OPEN = true; // 标识该窗口是新打开的，用于新窗口关闭自己的逻辑
                                  }}>
                            <Icon type="double-right"/>
                          </Button>
                          // <a title={`转到${configObj.cn || ''}`}
                          //    href={`./#/${configObj.modelName}`}
                          //    target={'_blank'}><Icon type="double-right"/></a>
                      ) : null
                    }
                  </>
                }
            >
              <Spin spinning={this.state.loading}>
                <List
                    dataSource={dataSource}
                    renderItem={item => (
                        <List.Item key={item.id}
                                   style={{padding: '8px 0', cursor: 'pointer'}}
                                   onClick={(e) => {

                                     this.handleChange(item);
                                   }}>
                          <Checkbox
                              checked={-1 !== findIndex(checkedList, {id: item.id})}

                              // filter(v => (-1 === findIndex(this.props.checkedList, { id: v.id })));
                              // onChange={this.handleChange.bind(this, item)}
                              // style={{ width: '100%', display: 'block', padding: '8px 0' }}
                          /> {item.code} {item.name}
                        </List.Item>
                    )}
                >
                </List>
              </Spin>
            </Card>
            {/*{this.state.loading && this.state.hasMore && (*/}
            {/*  <div className="demo-loading-container">*/}
            {/*    <Spin />*/}
            {/*  </div>*/}
            {/*)}*/}
          </Col>
        </Row>
    )
        ;
  }
  }

}
export interface ChooseCompProps extends ChooseCompFormProps {
  /**
   * modalProps 额外参数
   */
  modalProps: {};
  /**
   * visible Boolean 是否显示
   */
  visible: false; // Boolean 是否显示
  /**
   * title String （选传）自定义标题
   */
  title: ''; // String （选传）自定义标题
  /**
   * onOk Function “确认选择”之后的回调；@params checkedList Array 选中的数据数组
   */
  onOk: null; // Function “确认选择”之后的回调；
              // @params checkedList Array 选中的数据数组
              // (checkedList) => {}
  /**
   * onCancel Function “取消选择”的回调
   */
  onCancel: null; // Function “取消选择”的回调
};

export default class ChooseComp extends Component<ChooseCompProps,any> {

  // 确认 选择科目
  handleOk(e: any) {
    // console.log(e)
    const checkedList = [...this.chooseRef.getAjaxData()];

    this.props.onOk && this.props.onOk(checkedList);
  }
  ChooseComp = (context: JhConsumerProps)=>{
    const {config,localeUtils:{formatMsgByCn,myFormatMessage}} = context;
    const configObj = config || {};

    return (
        <ModalComp
            title={this.props.title || formatMsgByCn(configObj.cn) || ''}
            width={document.body.offsetWidth > 1200 ? document.body.offsetWidth * 0.5 : 520}
            visible={this.props.visible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.props.onCancel}
            zIndex={1050}
            {...this.props.modalProps}
        >
          <ChooseCompForm
              {...context}
              {...this.props}
              onRef={((refK, ref) => {
                this.chooseRef = ref;
              })}
          />
        </ModalComp>
    );
  };
  render() {
    return (
        <ConfigConsumer>
          {this.ChooseComp}
        </ConfigConsumer>
    )
  }
}


