import React from 'react';

class PowerButton extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
      super(props);
    }
    
    render() {
      return <div onClick={this.props.clickHandle} className="power-btn" id={this.props.power ? 'turned-on' : 'turned-off'} ></div>
    }
  }
  

  export default PowerButton