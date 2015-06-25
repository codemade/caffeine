var React = require('react');
var IntensityBar = require('../../app/components/intensity-bar.react.js');

class Article extends React.Component {
  render(){
    var article = this.props.article;
    var image = 'assets/138x138/article_' + article.id + '.png';

    return <div className="article-details">
            <img src={image} />
            <span className="article-name">{this.props.article.name}</span>&nbsp;(
            <span className="article-intensity">Intensität {this.props.article.intensity}</span>,&nbsp;
            <span className="article-price">Preis {this.props.article.price} €</span>)
            <IntensityBar intensity={this.props.article.intensity} />
           </div>;
  }
};

module.exports = Article;
