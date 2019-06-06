import React, {Component} from 'react';
import Navbar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx"
import Chatbar from "./ChatBar.jsx";
import messages from "./messages.json";
import uuidv1 from 'uuid/v1';
import { EEXIST } from 'constants';



class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: "Anonymous",
      messages: [],
      userColor: null,
      inputValue: null,
      connections: 0
    }
    this.formUpdate = this.formUpdate.bind(this)
    this.onEnterPress = this.onEnterPress.bind(this)
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    const ws = new WebSocket("ws://localhost:3001")
    console.log("socket!")
    ws.onopen = () => {
      
      ws.onmessage = (event) => {
        let data = event.data
        console.log(data)
        const jsonData = JSON.parse(data)
        jsonData.chatColor && this.setState({userColor: jsonData.chatColor})
        console.log('Received:', jsonData.messages);
        this.setState({messages: jsonData.messages, connections: jsonData.connectionNumber, userColor: this.state.userColor})
      };
    };
      this.ws = ws;
  }


  formUpdate = evt => {
    evt.preventDefault()
    const chatInput = evt.target.elements.chatInput.value
    const userInput = evt.target.elements.userInput.value
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

      form.name === 'chatInput' ? messageType = "incomingMessage" : messageType = "incomingNotification"
  
      messageType === 'incomingMessage' ? 
      newMessage={id: uuidv1(), username: this.state.currentUser, content: form.value, type: messageType, userColor: this.state.userColor}
      : newMessage= {username: form.value, type: messageType, content: `${this.state.currentUser} has changed their name to ${form.value}`};

      messageType === 'incomingNotification' && this.setState({currentUser: form.value});
      console.log(newMessage)
      const newMessageList = this.state.messages.concat(newMessage)

      const jsonList = JSON.stringify(newMessage)
      this.ws.send(jsonList)
    }
  }

  render() {

    return (
      <div>
        <Navbar connections={this.state.connections} />
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser} userColor={this.state.userColor} />
        <Chatbar formUpdate={this.formUpdate} onEnterPress={this.onEnterPress} />
      </div>
    );
    }
}
export default App;
