import React from 'react';

class StrictLight extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
      super(props);
    }
    
    render() {
      if (this.props.strict) {
        return <div className="strict-light-on"></div>
      } else {
        return <div className="strict-light-off"></div>
      }
    }
  }

  export default StrictLight