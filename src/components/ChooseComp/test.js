import GlobalProvider from '../GlobalProvider';
import ChooseComp from './index';
import ButtonComp from '../ButtonComp'
import React from 'react';
export default class Test extends React.Component{
    state={
        isShowModal:false,
    };
    handleOk=()=>{
        this.setState({isShowModal: false});
    };
    fetchFunc =(data)=>{
        return [
            {id:1,name:'1',code:'1'},
            {id:2,name:'2',code:'2'},
            {id:3,name:'3',code:'3'},
        ]
    };
    render(){

        return (<>
            <GlobalProvider>
                <ChooseComp
                    title='员工类型'
                    modalProps={{
                        loading:false
                    }}
                    visible={this.state.isShowModal}
                    onOk={this.handleOk.bind(this)}
                    onCancel={() => {
                        this.setState({isShowModal: false});
                    }}
                    // service={{
                    //     typeReq:()=>{
                    //         return {
                    //             data:[
                    //                 {category:'部门',code:'2626',id:'52',name:'部门'},
                    //                 {category:'dad',code:'666',id:'524',name:'会计'},
                    //                 {category:'gggg',code:'22',id:'512',name:'销售'},
                    //             ]
                    //         }
                    //     }
                    // }}
                    // fetchFunc={this.fetchFunc.bind(this)}
                    mode={'multi'}
                />
                <ButtonComp type={'primary'} onClick={()=>this.setState({isShowModal:true})}>示例</ButtonComp>
            </GlobalProvider>
        </>)
    }
}