import React from 'react';
import ObjectBox from './index';
import GlobalProvider from '../GlobalProvider';
import ButtonComp from '../ButtonComp';
import {Form} from "antd";

export default class Test extends React.Component{
    state = {
        detailLoading:false
    };
    render(){
        return (
        <>
            <GlobalProvider>
                <Form layout={'inline'}>
                    <Form.Item label={'示例'}>
                        <ObjectBox
                            style={{width:'200px'}}
                            compData={[
                                {id:1,name:'wct',code:'110'},
                                {id:2,name:'dx',code:'111'},
                                {id:3,name:'gf',code:'112'},
                            ]}
                        />
                    </Form.Item>
                </Form>
            </GlobalProvider>
        </>)
    }
}
