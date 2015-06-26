var React = require('react');
var ArticleCategory = require('../../app/components/article-category.react.js');

class ArticleList extends React.Component {
  render(){
    var categories = this.props.categories.map((category) => {
      var articles = this.props.articles
        .filter((article) => {
          return article.category === category.id;
        });
      return <ArticleCategory category={category} articles={articles} />
    });

    return <div>
            <h2>Diese Artikel sind verfügbar:</h2>
            {categories}
          </div>;
  }
};
module.exports = ArticleList;
