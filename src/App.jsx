import React, {Component} from 'react';
import Navbar from "./NavBar.jsx";
import Message from "./Message.jsx";
import Chatbar from "./ChatBar.jsx";
import messages from "./messages.json";


class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: messages
    }
  }

  
  render() {

    const messageList = this.state.messages.map(message => (
      <Message 
        message={message} 
        />
    ))

    return (
      <div>
        <Navbar />
        <main className="messages">
        {messageList}
        </main>
        <Chatbar />
      </div>
    );
    }
}
export default App;
