import {ConfigConsumerProps} from "antd/es/config-provider";

export interface BtConfigProviderProps {
    localeUtils?: any
}

export type BtConsumerProps = ConfigConsumerProps & BtConfigProviderProps;
