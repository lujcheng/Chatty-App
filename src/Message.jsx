import React, {Component} from 'react';
import Image from './Image.jsx';

class Message extends Component {
    constructor() {
        super()
        this.findURL.bind(this)
    }
    findURL = (content) => {
        const regex = /(https?:\/\/[^\s]+)/g;
        return content.replace(regex, function(url) {
            return <img src={url} />
        })
    }
    render() {

        const style = {
            color: this.props.message.userColor
        }
        const newContent = this.findURL(this.props.message.content)
        console.log("new content", this.props.message.content)
        console.log("after function", newContent)
        return (    
                <div className="message">
                <span className="message-username" style={style}>{this.props.message.username}</span>
                <span className="message-content"> {newContent} </span>
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