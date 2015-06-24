var React = require('react');
var VariationList = require('../app/components/variation-list.react.js');

class App extends React.Component {
  render(){
    return <div>
            Hello, React!
            <VariationList />
          </div>;
  }
};

React.render(<App/>, document.body);
