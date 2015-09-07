let React = require('react');
let Article = require('./article.react.js');

class ArticleCategory extends React.Component {
  render(){
    let articles = this.props.articles.map((article) => {
      return <Article key={article.id}
                      article={article}
                      actionCreator={this.props.actionCreator}/>
    });

    return <div className='category'>
            <h3 className='category-name'>{this.props.category.name}</h3>
            {articles}
          </div>;
  }
};

ArticleCategory.propTypes = {
  actionCreator: React.PropTypes.object.isRequired,
  category: React.PropTypes.object.isRequired,
  articles: React.PropTypes.array.isRequired
};
module.exports = ArticleCategory;
