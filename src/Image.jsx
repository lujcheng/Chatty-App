import React, { Component } from 'react'

class Image extends Component {
    render() {
        let style = {
            maxWidth: "20vw"
        }
        return <img style={style} src={this.props.imgURL} />
    }
}

export default Image;