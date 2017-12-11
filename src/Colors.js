import React from 'react';
import ColorButton from './ColorButton.js';
class Colors extends React.Component {
    render() {
      return <div id="colors">
             <ColorButton color="green" click={this.props.click}/>
             <ColorButton color="blue" click={this.props.click}/>
             <ColorButton color="yellow" click={this.props.click}/>
             <ColorButton color="red" click={this.props.click}/>
             </div>
    };
  }
  
  export default Colors