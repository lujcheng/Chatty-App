import React, {Component} from 'react';
import Navbar from "./NavBar.jsx";
import Message from "./Message.jsx";
import Chatbar from "./ChatBar.jsx";
import messages from "./messages.json";


class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: "Anonymous",
      messages: messages
    }
    this.formUpdate = this.formUpdate.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }
  
  formUpdate = evt => {
    evt.preventDefault()
    const chatInput = evt.target.elements.chatInput.value
    const userInput = evt.target.elements.userInput.value
    console.log(userInput, chatInput)
    const newMessage = {username: userInput, content: chatInput}
    const newMessageList = this.state.messages.concat(newMessage)
    this.setState({messages: newMessageList})
  }

  render() {

    const messageList = this.state.messages.map(message => (
      <Message 
        key={message.currentUser}
        message={message} 
        />
    ))

    return (
      <div>
        <Navbar />
        <main className="messages">
        {messageList}
        </main>
        <Chatbar formUpdate={this.formUpdate} />
      </div>
    );
    }
}
export default App;
