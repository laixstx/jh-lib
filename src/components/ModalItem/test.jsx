import React from 'react';
import ModalItem from './index';
import GlobalProvider from '../GlobalProvider';
import ButtonComp from '../ButtonComp';
export default class Test extends React.Component{
    state = {
        detailLoading:false
    };
    cancel = ()=>{
        this.setState({detailLoading:false})
    };
    render(){
        return (
        <>
            <GlobalProvider>
                <ModalItem
                    isShowDetail = {this.state.detailLoading}
                    onOk = {()=>this.cancel()}
                    onCancel= {()=>this.cancel()}
                >
                    <div>自定义布局详情页</div>
                </ModalItem>
                <ButtonComp type={'primary'} onClick={()=>{
                    this.setState({detailLoading:true})
                }}>
                    实例
                </ButtonComp>
            </GlobalProvider>
        </>)
    }
}
