var React = require('react');
var ArticleList = require('../../app/components/article-list.react.js');
var DataSource = require('../../article-data.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DataSource;
  }

  render(){
    return <div>
            <h1>Unsere Kaffee-Geschmackserlebnisse</h1>
            <ArticleList categories={this.state.categories}
                           articles={this.state.articles} />
          </div>;
  }
};
module.exports = App;
