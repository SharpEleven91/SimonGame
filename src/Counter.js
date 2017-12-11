import React from 'react';

class Counter extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
      super(props);
    }
    render() {
      if (this.props.power) {
        return <p className="counter">{this.props.counter < 10 ? "0" + this.props.counter : this.props.counter} </p>
      } else {
        return <p></p>
      }
    }
  }
  
  export default Counter