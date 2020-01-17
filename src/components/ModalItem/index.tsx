import React from 'react';
import ModalComp,{ModalCompProps} from './ModalComp';

import { isString } from 'lodash-es';

import {ConfigConsumer} from 'antd/es/config-provider'
import {JhConsumerProps} from '../Config'

// @connect(({ global: { appCode, userInfo } }) => ({ appCode, userInfo }))
export interface ModalItemProps extends ModalCompProps{

}
class ModalItem extends React.Component<ModalItemProps> {

   modalIt = (context: JhConsumerProps)=>{
     const {localeUtils} = context;
     const moreProps: any = {};
     // 如果没有保存权限，则隐藏 【确认】 按钮

     moreProps.okButtonProps = localeUtils&&localeUtils.formatMsgByCn('确定');
     moreProps.cancelText = localeUtils&&localeUtils.formatMsgByCn('返回');

     // title 的国际化处理
     let { title } = this.props;
     if (isString(title)) {
       let editInd = title.indexOf('编辑');
       if (-1 !== editInd) {
         title = localeUtils&&localeUtils.myFormatMessage('crud.edit') + localeUtils&&localeUtils.formatMsgByCn(title.substr(editInd + 2));
       }
        // @ts-ignore
       let addInd = title.indexOf('新建');
         // @ts-ignore
         let addInd1 = title.indexOf('新增');
       addInd = -1 === addInd ? addInd1 : addInd;

       if (-1 !== addInd) {
         // @ts-ignore
           title = localeUtils&&localeUtils.myFormatMessage('crud.add') + localeUtils&&localeUtils.formatMsgByCn(title.substr(addInd + 2));
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



export default ModalItem;
