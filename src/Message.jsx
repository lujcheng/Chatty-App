import React, {Component} from 'react';
import Image from './Image.jsx';

class Message extends Component {
    render() {
        // style variable to set username color
        const style = {
            color: this.props.message.userColor
        }
        // variables below used for image generation
        let phrase = this.props.message.content
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
        let newImageArr = null;
        let newContent = null;
        let imageDisplay = null;
        // map images in html elements
        if (phrase.search(regex) >= 0) {
            newImageArr = phrase.match(regex);
            phrase = phrase.replace(regex, "");
            imageDisplay = newImageArr.map((url) => {return <Image imgURL={url} />});
        }

        return (    
                <div className="message" id={this.props.message.id}>
                <span className="message-username" style={style}>
                    {this.props.message.username}
                </span>
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
            <div className="message system" id={this.props.message.id}>
                {this.props.message.content}
            </div>
        )
    }
}

export {Message, Notification};