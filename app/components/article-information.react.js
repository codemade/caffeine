var React = require('react');

class ArticleInformation extends React.Component {
  render() {
    var styles = {
      border:'1px solid white'
    };
    return <div className="article-information" style={styles}>
       {this.props.article.name}
    </div>;
  }
}

ArticleInformation.propTypes = {
  article: React.PropTypes.object
}

module.exports = ArticleInformation;
