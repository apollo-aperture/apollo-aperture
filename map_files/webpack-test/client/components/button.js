import React, { Component } from 'react';

export default class ButtonExample extends Component {
    constructor(props) {
        super(props);
    }
    onClick(){
        alert("Button has been clicked");
    }
    render() {
        let defaultClasses = "mui-btn mui-btn--raised mui-btn--primary";
        let onClick = this.onClick.bind(this);
        return (
            <button onClick={this.onClick} className={defaultClasses}>
                {this.props.text}
            </button>
        );
    }
}