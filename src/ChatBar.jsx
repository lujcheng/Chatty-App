import React, {Component} from 'react';

class Chatbar extends Component {
    render() {

        return (
            <footer className="chatbar">
                <form className="chatbar-form" onSubmit={this.props.formUpdate}>
                    <input name="userInput" className="chatbar-username" placeholder="Your Name (Optional)" />
                    <input name="chatInput" className="chatbar-message" placeholder="Type a message and hit ENTER" />
                    <button type="submit">Send</button>
                </form>
            </footer>
        )
    }
}

export default Chatbar;