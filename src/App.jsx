import React, {Component} from 'react';
import Navbar from "./NavBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx"
import Chatbar from "./ChatBar.jsx";
import messages from "./messages.json";
import uuidv1 from 'uuid/v1';



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
    this.sendJson = this.sendJson.bind(this)
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    const ws = new WebSocket("ws://localhost:3001")
    console.log("socket!")
    ws.onopen = () => {
      this.sendJson()
    };

    ws.onmessage = (event) => {
      let data = event.data
      console.log(data)
      const jsonData = JSON.parse(data)
      console.log('Received:', jsonData);
      this.setState({messages: jsonData})
    };
    this.ws = ws;
  }
  sendJson = () => {
    const messageList = this.state.messages;
      const jsonList = JSON.stringify(messageList)
      console.log('Sending:', jsonList);
      this.ws.send(jsonList);
  }

  formUpdate = evt => {
    evt.preventDefault()
    const chatInput = evt.target.elements.chatInput.value
    const userInput = evt.target.elements.userInput.value
    console.log(userInput, chatInput)
    const newMessage = {id: uuidv1(), username: userInput, content: chatInput}
    const newMessageList = this.state.messages.concat(newMessage)
    this.setState({messages: newMessageList})
  }

  onEnterPress = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault()
      let messageType;
      let newMessage
      const form = event.target
      console.log(event.target.name)
      form.name === 'chatInput' ? messageType = "incomingMessage" : messageType = "incomingNotification"
  
      messageType === 'incomingMessage' ? 
      newMessage={id: uuidv1(), username: this.state.currentUser, content: form.value, type: messageType}
      : newMessage= {username: form.value, type: messageType, content: `${this.state.currentUser} has changed their name to ${form.value}`};

      messageType === 'incomingNotification' && this.setState({currentUser: form.value});
      console.log(newMessage)
      const newMessageList = this.state.messages.concat(newMessage)
      this.setState({messages: newMessageList})
      const jsonList = JSON.stringify(newMessageList)
      ws.send(jsonList)
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
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser} />
        <Chatbar formUpdate={this.formUpdate} onEnterPress={this.onEnterPress} />
      </div>
    );
    }
}
export default App;
