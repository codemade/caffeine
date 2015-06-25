var React = require('react');

class Article extends React.Component {
  render(){
    var article = this.props.article;
    var image = 'assets/138x138/article_' + article.id + '.png';
    return <div className="article-details">
            <img src={image} />
            <span className="article-name">{article.name}</span>&nbsp;(
            <span className="article-intensity">Intensität {article.intensity}</span>,&nbsp;
            <span className="article-price">Preis {article.price} €</span>)
           </div>;
  }
};

module.exports = Article;
