import React, {Component} from 'react';

class Navbar extends Component {
    render() {
        const style = {
            display: "flex",
            justifyContent: "space-between"
        }
        return (
            <nav className="navbar" style={style} >
                <a href="/" className="navbar-brand">Chatty</a>
                <span className="navbar-brand" style={{fontSize: "1em"}}>{this.props.connections} users currently online </span>
            </nav>
        )
    }
}

export default Navbar;