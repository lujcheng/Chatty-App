import React, {Component} from 'react';
// chat bar holds values for username message input, both use controlled inputs
class Chatbar extends Component {
    render() {
        return (
            <footer className="chatbar">
                <form className="chatbar-form" onKeyDown={this.props.onEnterPress} >
                    <input name="userInput" onChange={this.props.onChange} value={this.props.userValue} className="chatbar-username" placeholder="Your Name (Optional)" />
                    <input name="chatInput" onChange={this.props.onChange} value={this.props.chatValue} className="chatbar-message" placeholder="Type a message and hit ENTER" />       
                </form>
            </footer>
        )
    }
}

export default Chatbar;