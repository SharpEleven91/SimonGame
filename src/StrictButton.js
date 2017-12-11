import React from 'react';

class StrictButton extends React.Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return <div onClick={this.props.click} className="strict-btn"></div>
    }
  }

  export default StrictButton