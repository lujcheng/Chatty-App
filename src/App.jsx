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
      userValue: 'Anonymous',
      chatValue: null,
      connections: 0
    }
    this.onEnterPress = this.onEnterPress.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    const ws = new WebSocket("ws://localhost:3001")
    ws.onopen = () => {
      ws.onmessage = (event) => {
        let data = event.data
        console.log(data)
        const jsonData = JSON.parse(data)
        jsonData.chatColor && this.setState({userColor: jsonData.chatColor})
        console.log('Received:');
        this.setState({messages: jsonData.messages, connections: jsonData.connectionNumber, userColor: this.state.userColor})
      };
    };
      this.ws = ws;
  }

  onChange = (event) => {
    event.target.name === 'chatInput' ? this.setState({chatValue: event.target.value}) : this.setState({userValue: event.target.value})
  }

  onEnterPress = (event) => {
    if(event.key === 'Enter') {
      let messageType;
      let newMessage
      const form = event.target

      form.name === 'chatInput' ? messageType = "incomingMessage" : messageType = "incomingNotification"

      messageType === 'incomingMessage' ? 
      newMessage={id: uuidv1(), username: this.state.currentUser, content: form.value, type: messageType, userColor: this.state.userColor}
      : newMessage= {id: uuidv1(), username: form.value, type: messageType, content: `${this.state.currentUser} has changed their name to ${form.value}`}

      messageType === 'incomingNotification' && this.setState({currentUser: form.value})

      const jsonList = JSON.stringify(newMessage)
      this.ws.send(jsonList)
    }
  }

  render() {
    return (
      <div id="app-container">
        <Navbar connections={this.state.connections} />
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser} userColor={this.state.userColor} />
        <Chatbar onChange={this.onChange} onEnterPress={this.onEnterPress} userValue={this.state.userValue} chatValue={this.state.chatValue} />
      </div>
    )
  }
}
export default App;
