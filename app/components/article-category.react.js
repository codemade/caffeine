var React = require('react');
var Article = require('./article.react.js');

class ArticleCategory extends React.Component {
  render(){
    var articles = this.props.articles.map((article) => {
      return <Article article={article}
                      actionCreator={this.props.actionCreator}/>
    });

    return <div className="category">
            <h3>{this.props.category.name}</h3>
            {articles}
          </div>;
  }
};

ArticleCategory.propTypes = {
  actionCreator: React.PropTypes.object
};
module.exports = ArticleCategory;
