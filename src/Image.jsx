import React, { Component } from 'react'

class Image extends Component {
    render() {
        let style = {
            maxWidth: "10vw"
        }
        return <img style={style} src={this.props.imgURL} />
    }
}

export default Image;