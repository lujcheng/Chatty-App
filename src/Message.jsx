import React, {Component} from 'react';

class Message extends Component {
    render() {
        return (    
                <div className="message">
                <span className="message-username">{this.props.message.username}</span>
                <span className="message-content"> {this.props.message.content} </span>
                </div>
        )
    }
}

class Notification extends Component {
    render() {
        return (
            <div className="message system">{this.props.message.content}</div>
        )
    }
}

export {Message, Notification};