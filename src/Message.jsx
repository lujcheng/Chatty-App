import React, {Component} from 'react';
import Image from './Image.jsx';

class Message extends Component {
    render() {
        const style = {
            color: this.props.message.userColor
        }
        let phrase = this.props.message.content
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
        let newImageArr = null;
        let newContent = null;
        let imageDisplay = null;
        console.log(phrase.search(regex) >= 0)
        if (phrase.search(regex) >= 0) {
            newImageArr = phrase.match(regex);
            phrase = phrase.replace(regex, "");
            imageDisplay = newImageArr.map((url) => {return <Image imgURL={url} />});
        }

        return (    
                <div className="message">
                <span className="message-username" style={style}>{this.props.message.username}</span>
                <span className="message-content"> 
                 <p>{phrase}</p>
                 {imageDisplay}
                </span>
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