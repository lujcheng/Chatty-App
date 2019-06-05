import React, {Component} from 'react';
import {Message, Notification} from './Message.jsx';

class MessageList extends Component {
  render() {
    const messageList = this.props.messages.map(message => {
  
      if (message.type == 'incomingMessage') {
    {return <Message message={message} />}
      } else {
        {return <Notification message={message} />}
      }
      
    })
    console.log("messagelist", messageList)
    return (
      <main className="messages">
        {messageList}
      </main>
    )
  }
}

export default MessageList;