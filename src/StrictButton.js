import React from 'react';

class StrictButton extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
      super(props);
    }
    
    render() {
      return <div onClick={this.props.click} className="strict-btn"></div>
    }
  }

  export default StrictButton