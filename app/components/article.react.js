let React = require('react');
let IntensityBar = require('./intensity-bar.react.js');

class Article extends React.Component {
  handleClick() {
    this.props.actionCreator.selectArticle(this.props.article.id);
  }

  render() {
    let article = this.props.article;
    let image = 'assets/60x60/article_' + article.id + '.png';
    let className = article.isMatchingFilter ? 'article-details' : 'article-details grayed-out';

    return <div className={className} onClick={this.handleClick.bind(this)}>
            <img src={image} />
            <br />
            <span className='article-name'>{this.props.article.name}</span>
            <br />
            <span className='intensity-label'>Intensität <span className="intensity-value">{this.props.article.intensity}</span></span>
            <IntensityBar intensity={this.props.article.intensity} />
            <span className="article-price">Preis {this.props.article.price} €</span>
           </div>;
  }
}

Article.propTypes = {
  article: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    intensity: React.PropTypes.number.isRequired,
    price: React.PropTypes.number.isRequired,
    isMatchingFilter: React.PropTypes.bool.isRequired
  })
};
module.exports = Article;
