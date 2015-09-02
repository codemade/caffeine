var React = require('react');

class ArticleInformation extends React.Component {
  render() {
    let styles = {
      border:'1px solid white'
    };

    let addToCart = () => {
      this.props.actionCreator.addArticleToShoppingCart(this.props.article.id, 10);
    };

    return <div className='article-information' style={styles}>
       <span className='article-name'>{this.props.article.name}</span>
       <button className='addToCart' onClick={addToCart}>+</button>
    </div>;
  }
}

ArticleInformation.propTypes = {
  actionCreator: React.PropTypes.object.isRequired,
  article: React.PropTypes.object.isRequired
}

module.exports = ArticleInformation;
