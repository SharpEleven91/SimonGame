import React from 'react';

class StartButton extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
      super(props);
    }
    
    render() {
      return <div onClick={this.props.clickHandle} className="start-btn"></div>
    }
  }

  export default StartButton