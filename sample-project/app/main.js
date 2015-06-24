var React = require('react');
var Variation = require('../app/components/variation.react.js');

class App extends React.Component {
  render(){
    return <div>
            Hello, React!
            <Variation />
          </div>;
  }
};

React.render(<App/>, document.body);
