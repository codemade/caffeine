let React = require('react');
let IntensityBar = require('./intensity-bar.react.js');

class Article extends React.Component {
  handleClick() {
    this.props.actionCreator.selectArticle(this.props.article.id);
  }

  render() {
    let article = this.props.article;
    let className = article.isMatchingFilter ? 'article-details' : 'article-details grayed-out';

    let styles = {
      backgroundColor: article.color
    };

    return <div className={className} onClick={this.handleClick.bind(this)}>
            <div className="article-image" style={styles}></div>
            <br />
            <span className='article-name'>{this.props.article.name}</span>
            <br />
            <span className='intensity-label'>Intensität <span className="intensity-value">{this.props.article.intensity}</span></span>
            <IntensityBar intensity={this.props.article.intensity} />
            <span className="article-price">Preis {this.props.article.price / 100} €</span>
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
