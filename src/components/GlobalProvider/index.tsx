import * as React from 'react';
import {ConfigConsumer, ConfigContext} from 'antd/es/config-provider/context';
import {omit} from "lodash-es";
import {JhConsumerProps, GlobalProviderProps} from '../Config'


class GlobalProvider extends React.Component<GlobalProviderProps> {
    renderProvider = (context: JhConsumerProps) => {

        const config: JhConsumerProps = {
            ...context,
            ...omit(this.props, ['children'])
        };

        return (
            <ConfigContext.Provider value={config}>
                {this.props.children}
            </ConfigContext.Provider>
        );
    };

    render() {
        return (
            <ConfigConsumer>
                {this.renderProvider}
            </ConfigConsumer>
        );
    }
}

export default GlobalProvider;
