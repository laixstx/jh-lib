import * as React from 'react';
import {ConfigConsumer, ConfigContext} from 'antd/es/config-provider/context';
import {omit} from "lodash-es";
import {BtConsumerProps, BtConfigProviderProps} from '../Config'


class ConfigProvider extends React.Component<BtConfigProviderProps> {
    renderProvider = (context: BtConsumerProps) => {

        const config: BtConsumerProps = {
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

export default ConfigProvider;
