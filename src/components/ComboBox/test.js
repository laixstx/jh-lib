import React from 'react';
import ComboBox from './index' ;
import GlobalProvider from '../GlobalProvider';
import ButtonComp from '../ButtonComp'

export default class Test extends React.Component {

    state = {
        value:'110'
    }
    render(){

        return (
            <GlobalProvider>
                <ComboBox
                    value={this.state.value}
                    compData={[
                        {id:1,name:'wct',code:'110'},
                        {id:2,name:'dx',code:'111'},
                        {id:3,name:'gf',code:'112'},
                    ]}
                    // service={{
                    //     fetchFunc:()=>{
                    //
                    //     }
                    // }}
                    onChange={(values)=>{
                        console.log('>>>>',values);
                        this.setState({
                            value:values
                        })
                    }}
                />
                <ButtonComp type={'primary'} style={{marginLeft:16}}>
                    示例
                </ButtonComp>
            </GlobalProvider>
        )
    }
}