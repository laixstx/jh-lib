import {ConfigConsumerProps} from "antd/es/config-provider";

interface LocaleUtilsProps {
    formatMsgByCn: Function,
    myFormatMessage: Function
}

export interface BtConfigProviderProps {
    localeUtils?: any
}

export type BtConsumerProps = ConfigConsumerProps & BtConfigProviderProps;
