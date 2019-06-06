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
        const jsonData = JSON.parse(data)
        // setting username color state variable with socket data
        jsonData.chatColor && this.setState({userColor: jsonData.chatColor})
        console.log('Received:');
        // set state for concatenated messagelist from websocket server
        this.setState({messages: jsonData.messages, connections: jsonData.connectionNumber, userColor: this.state.userColor})
      };
    };
      this.ws = ws;
  }

  // used for controlled input, set state on input change
  onChange = (event) => {
    event.target.name === 'chatInput' ? this.setState({chatValue: event.target.value}) : this.setState({userValue: event.target.value})
  }

  // enter to submit message
  onEnterPress = (event) => {
    if(event.key === 'Enter') {
      let messageType;
      let newMessage
      const form = event.target
      // determines message type
      form.name === 'chatInput' ? messageType = "incomingMessage" : messageType = "incomingNotification"
      // creating object structure for message based on message type
      messageType === 'incomingMessage' ? 
      newMessage={id: uuidv1(), username: this.state.currentUser, content: form.value, type: messageType, userColor: this.state.userColor}
      : newMessage= {id: uuidv1(), username: form.value, type: messageType, content: `${this.state.currentUser} has changed their name to ${form.value}`}
      // change current user state upon username input
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
