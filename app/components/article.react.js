let React = require('react');
let IntensityBar = require('./intensity-bar.react.js');

class Article extends React.Component {
  handleClick() {
    //this.props.actionCreator.selectArticle(this.props.article.id);
    this.props.actionCreator.addArticleToShoppingCart(this.props.article.id, 10);
  }

  render() {
    let article = this.props.article;
    let className = article.isMatchingFilter ? 'articleDetails' : 'articleDetails grayed-out';

    let styles = {
      backgroundColor: article.color
    };

    return <div className={className} onClick={this.handleClick.bind(this)}>
            <div className="articleDetails__image" style={styles}></div>
            <br />
            <div className="articleDetails__contentWrapper">
              <span className='articleDetails__name'>{this.props.article.name}</span>
              <br />
              <span className='articleDetails__intensityLabel'>Intensität <span className="articleDetails__intensityValue">{this.props.article.intensity}</span></span>
              <IntensityBar intensity={this.props.article.intensity} />
              <span className="articleDetails_price">Preis {this.props.article.price / 100} €</span>
            </div>
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
