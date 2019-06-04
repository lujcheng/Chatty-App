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
    return (
      <div>
        <Navbar />
        <Message messages={this.state.messages[0].content} />
        <Chatbar />
      </div>
    );
    }
}
export default App;
