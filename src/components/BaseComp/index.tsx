import React, {Component} from 'react';
import GlobalConsumer from '../GlobalConsumer'
import {JhConsumerProps} from "../Config";

export default class BaseComp extends Component {

    protected mainRender(context: JhConsumerProps): React.ReactNode {
        return null;
    }

    render(): React.ReactNode {
        return <GlobalConsumer>
            {this.mainRender.bind(this)}
        </GlobalConsumer>;
    }
}

class BaseActionComp extends BaseComp {

    /**
     * 是否有操作权限
     */
    hadAuth() {
        return true;
    }

    protected noAuthRender(context: JhConsumerProps): React.ReactNode {
        return null;
    }

    protected mainRender(context: JhConsumerProps): React.ReactNode {

        if (false === this.hadAuth()) {
            return this.noAuthRender(context);
        }

        return null;
    }
}