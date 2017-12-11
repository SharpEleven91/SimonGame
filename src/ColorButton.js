import React from 'react';

class ColorButton extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <div onClick={this.props.click} className={this.props.color}></div>
    };
  }
  
  export default ColorButton