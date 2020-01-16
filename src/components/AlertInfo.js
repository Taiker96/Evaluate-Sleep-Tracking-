import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from 'react-redux';


class AlertInfo extends Component {

    handleDismiss = () => {
        this.props.alertOff();
    }

    render() {
        if(this.props.alertShow === false) return null;
        return (
            <AlertContainer>
		<Alert type={this.props.AlertType} onDismiss={() => this.handleDismiss()} timeout={1000}>
            {this.props.AlertContent}
        </Alert>
	</AlertContainer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        alertShow: state.alertShow,
        AlertType: state.AlertType, //Đổi màu 
        AlertContent: state.AlertContent //Nội dung alert
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alertOff: () => { //Truyền dữ liệu sau khi sữa lên store
            dispatch({type:"ALERT_OFF"})
          }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertInfo)

