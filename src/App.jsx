import React, {Component} from 'react';
import Navbar from "./NavBar.jsx";
import Message from "./Message.jsx";
import Chatbar from "./ChatBar.jsx";
import messages from "./messages.json";
const parse = require('json-parse')



class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: "Anonymous",
      messages: messages,
      inputValue: null
    }
    this.formUpdate = this.formUpdate.bind(this)
    this.onEnterPress = this.onEnterPress.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const ws = new WebSocket("ws://localhost:3001")
    console.log("socket!")
    ws.onopen = () => {
      const messageList = this.state.messages;
      const jsonList = JSON.stringify(messageList)
      console.log('Sending:', jsonList);
      ws.send(jsonList);
    };

    ws.onmessage = (event) => {
      console.log(event)
      let data = event.data
      const jsonData = JSON.parse(data)
      console.log('Received:', jsonData);
    };

 
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

  onEnterPress = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault()
      let chatInput;
      let userInput;
      console.log(event.target.name)
      event.target.name === 'chatInput' 
      ? chatInput = event.target.value
      : userInput = event.target.value;
      console.log(userInput, chatInput)
      let newMessage
      chatInput 
      ? newMessage={username: this.state.currentUser, content: chatInput}
      : newMessage= {username: this.state.currentUser, content: `has changed their name to ${userInput}`};
      userInput && this.setState({currentUser: userInput});
      const newMessageList = this.state.messages.concat(newMessage)
      this.setState({messages: newMessageList})
    }
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
        <Chatbar formUpdate={this.formUpdate} onEnterPress={this.onEnterPress} />
      </div>
    );
    }
}
export default App;
