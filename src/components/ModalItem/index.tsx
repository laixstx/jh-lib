import React from 'react';
import ModalComp from '@/components/ModalItem/ModalComp';
// import { getConfigByKeyValue, isAuthByActionType } from '@/appConfig';
// import { connect } from 'dva';
import { isString } from 'lodash-es';
// import { formatMsgByCn, myFormatMessage } from '@/utils/localeUtils';
import {ConfigConsumer} from 'antd/es/config-provider'
import {BtConsumerProps} from '../Config'

// @connect(({ global: { appCode, userInfo } }) => ({ appCode, userInfo }))
class ModalItem extends React.Component {

   modalIt = ({localeUtils,appConfig,global:{appCode, userInfo}}: BtConsumerProps)=>{
     const {formatMsgByCn, myFormatMessage}=localeUtils;
     const {getConfigByKeyValue, isAuthByActionType}=appConfig;
     const moreProps = {};
     // 如果没有保存权限，则隐藏 【确认】 按钮
     const userInfo = userInfo || {};
     const appConfigObj = getConfigByKeyValue('appCode', appCode);
     let hadAuth = isAuthByActionType(this.props.actionType, appConfigObj, userInfo.resources);

     if (!hadAuth) {
       moreProps.okButtonProps = { ...(this.props.okButtonProps || {}), disabled: true, style: { display: 'none' } };
       moreProps.cancelText = formatMsgByCn('返回');
     }

     // title 的国际化处理
     let { title } = this.props;
     if (isString(title)) {
       let editInd = title.indexOf('编辑');
       if (-1 !== editInd) {
         title = myFormatMessage('crud.edit') + formatMsgByCn(title.substr(editInd + 2));
       }

       let addInd = title.indexOf('新建');
       let addInd1 = title.indexOf('新增');
       addInd = -1 === addInd ? addInd1 : addInd;

       if (-1 !== addInd) {
         title = myFormatMessage('crud.add') + formatMsgByCn(title.substr(addInd + 2));
       }
     }

     return (
         <ModalComp
             {...this.props}
             {...moreProps}
             title={title}
         />
     );
   };

  render() {
   return (
       <ConfigConsumer>
         {this.modalIt}
       </ConfigConsumer>
   )
  }
}

ModalItem.defaultProps = {
  ...ModalComp.defaultProps,
  actionType: 'save',
};

export default ModalItem;
