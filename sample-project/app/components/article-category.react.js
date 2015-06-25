var React = require('react');
var Article = require('../../app/components/article.react.js');

class ArticleCategory extends React.Component {
  render(){
    var articles = this.props.articles.map((article) => {
      return <Article article={article} />
    });

    return <div className="category">
            <h3>{this.props.category.name}</h3>
            {articles}
          </div>;
  }
};
module.exports = ArticleCategory;
