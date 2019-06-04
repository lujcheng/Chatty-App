import React, {Component} from 'react';

class Chatbar extends Component {
    render() {

        return (
            <footer className="chatbar">
                <form className="chatbar-form" onSubmit={this.props.formUpdate} onKeyDown={this.props.onEnterPress} >
                    <input name="userInput" className="chatbar-username" placeholder="Your Name (Optional)" />
                    <input name="chatInput" className="chatbar-message" placeholder="Type a message and hit ENTER" />
                   
                </form>
            </footer>
        )
    }
}

export default Chatbar;