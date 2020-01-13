import styles from './index.css';
import React from 'react';
import {BtButton,} from '../components';
import {BtConfigProvider,Result} from '../../../../src'
import * as localeUtils from '@/utils/localeUtils'
import { formatMessage, setLocale } from 'umi-plugin-locale';

const ThemeContext = React.createContext('link');

class App extends React.Component{
  constructor(props){
    super(props)
  }
  static contextType = ThemeContext;

  render() {
    console.log('dddaaa', this.context)

    return (
      <BtConfigProvider localeUtils={localeUtils}>
        <div className={styles.normal}>
          <Result type='success' title='提交成功'/>

        <BtButton onClick={() => {
          setLocale('en-US')
        }} type={this.context.type} theme={this.context}>英文</BtButton>
        <BtButton onClick={() => {
          setLocale('zh-CN')
        }} type={this.context.type} theme={this.context}>中文</BtButton>
        <div>
          {this.context.value}
        </div>
      </div>
    )
  }
}
function Toolbar(props){
  return (
    <div>
      <App {...props}/>
    </div>
  )
}

export default class ThemedButton  extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      value:1
    }
  }
   add = ()=>{

    let {value} = this.state;
     value +=1
    this.setState({
      value:value
    });
   };

  render(){
    let {value} = this.state;
    return (
      <ThemeContext.Provider value={
        {
          type:"danger",
          lock:true,
          value
        }
      }>
        <Toolbar add = {this.add} {...this.props}/>
      </ThemeContext.Provider>
    );
  }
}
