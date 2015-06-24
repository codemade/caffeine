var React = require('react');
var VariationList = require('../app/components/variation-list.react.js');
var DataSource = require('../variations-data.js');

class App extends React.Component {
  render(){
    return <div>
            <h1>Unsere Kaffee-Geschmackserlebnisse</h1>
            <VariationList categories={DataSource.categories}
                           variations={DataSource.variations} />
          </div>;
  }
};

React.render(<App/>, document.body);
