var React = require('react');
var IntensityBar = require('../../app/components/intensity-bar.react.js');

class Article extends React.Component {
  render(){
    var article = this.props.article;
    var image = 'assets/60x60/article_' + article.id + '.png';
    var className = article.active ? "article-details" : "article-details inactive";

    return <div className={className}>
            <img src={image} />
            <br />
            <span>{this.props.article.name}</span>
            <br />
            <span className='intensity-label'>Intensität {this.props.article.intensity}</span>
            <IntensityBar intensity={this.props.article.intensity} />
            <span className="article-price">Preis {this.props.article.price} €</span>
           </div>;
  }
};

module.exports = Article;
