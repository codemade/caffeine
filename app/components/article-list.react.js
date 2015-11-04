let React = require('react');
let Article = require('./article.react.js');

let ArticleList = React.createClass({
  render() {
    let articles = this.props.articles.map((article) => {
      return <Article key={article.id}
                      article={article}
                      actionCreator={this.props.actionCreator}/>;
    });

    return <div>
            {articles}
          </div>;
  }
});

ArticleList.propTypes = {
  actionCreator: React.PropTypes.object.isRequired,
  categories: React.PropTypes.array.isRequired,
  articles: React.PropTypes.array.isRequired
};
module.exports = ArticleList;
