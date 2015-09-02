var React = require('react');
var ArticleCategory = require('./article-category.react.js');

class ArticleList extends React.Component {
  render(){
    var categories = this.props.categories.map((category) => {
      var articles = this.props.articles
        .filter((article) => {
          return article.category === category.id;
        });
      return <ArticleCategory
                key={category.id}
                category={category}
                articles={articles}
                actionCreator={this.props.actionCreator} />
    });

    return <div>
            <h2>Diese Artikel sind verfügbar:</h2>
            {categories}
          </div>;
  }
};

ArticleList.propTypes = {
  actionCreator: React.PropTypes.object.isRequired,
  categories: React.PropTypes.array.isRequired,
  articles: React.PropTypes.array.isRequired
};
module.exports = ArticleList;
