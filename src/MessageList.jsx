import React, {Component} from 'react';
import {Message, Notification} from './Message.jsx';

class MessageList extends Component {
  render() {
    // map data to create message or notification components
    const messageList = this.props.messages.map(message => {
      if (message.type == 'incomingMessage') {
        return <Message message={message} userColor={this.props.userColor} />
      } else {
        {
          return <Notification message={message} />
        }
      }    
    })

    return (
      <main className="messages" id="message-list">
        {messageList}
      </main>
    )
  }
}

export default MessageList;