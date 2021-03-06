import React, { Component } from 'react';
import { connect } from "react-redux";
import { closeWidget, abtractAction, minimizeWidget } from "../actions/chatActions"
import { helperFunctions } from "../lib/helperFunctions";
import { withTranslation } from 'react-i18next';

@connect((store) => {
    return {
        chatwidget: store.chatwidget
    };
})

class HeaderChat extends Component {

    constructor(props) {
        super(props);
        this.closeWidget = this.closeWidget.bind(this);
        this.endChat = this.endChat.bind(this);
        this.popup = this.popup.bind(this);
    }

    closeWidget() {
        this.props.dispatch(minimizeWidget());
    }

    endChat() {
        this.props.endChat();
    }

    popup() {
        this.props.popupChat();
    }
    
    componentDidMount() {
        var dropdown = document.getElementById('headerDropDown');
        if (dropdown) {
            var bsn = require("bootstrap.native/dist/bootstrap-native-v4");
            new bsn.Dropdown(dropdown);
        }
    }

    render() {
        const { t } = this.props;

        var className = 'row header-chat' + (this.props.chatwidget.get('isMobile') == true ? ' mobile-header' : ' desktop-header');
        var classNameMenu = 'col-6 pr-1' + (this.props.chatwidget.get('isChatting') === false && this.props.chatwidget.hasIn(['chat_ui','hide_popup']) ? ' d-none' : '');

        return (
            <div id="widget-header-content" className={className}>
                {this.props.chatwidget.hasIn(['chat_ui','custom_html_header_body']) && <div className="lhc-custom-header-inside" dangerouslySetInnerHTML={{__html:this.props.chatwidget.getIn(['chat_ui','custom_html_header_body'])}}></div>}

                {(!this.props.chatwidget.hasIn(['chat_ui','clinst']) || this.props.chatwidget.get('isMobile')) &&  <div className="col-6 pl-1 minimize-icon">
                    <span className="header-link" title={t('button.minimize')} onClick={this.closeWidget}><i className="material-icons">&#xf103;</i></span>
                </div>}

                <div className={classNameMenu}>
                    <div className="d-flex">
                        <div className="ml-auto">
                            {!this.props.chatwidget.hasIn(['chat_ui','hide_popup']) && <a className="header-link" title={t('button.popup')} onClick={this.popup}><i className="material-icons">&#xf106;</i></a>}
                            {this.props.chatwidget.get('isChatting') === true && !this.props.chatwidget.hasIn(['chat_ui','hide_close']) && <a title={t('button.end_chat')} className="header-link" onClick={this.endChat}><i className="material-icons">&#xf10a;</i></a>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(HeaderChat);
