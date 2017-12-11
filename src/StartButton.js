import React from 'react';

class StartButton extends React.Component {
    constructor(props) {
      super(props);
    }
    
    render() {
      return <div onClick={this.props.clickHandle} className="start-btn"></div>
    }
  }

  export default StartButton