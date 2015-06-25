var React = require('react');
var ArticleList = require('../app/components/article-list.react.js');
var DataSource = require('../article-data.js');

class App extends React.Component {
  render(){
    return <div>
            <h1>Unsere Kaffee-Geschmackserlebnisse</h1>
            <ArticleList categories={DataSource.categories}
                           articles={DataSource.articles} />
          </div>;
  }
};

React.render(<App/>, document.body);
