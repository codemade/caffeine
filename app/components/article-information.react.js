var React = require('react');

class ArticleInformation extends React.Component {
  render() {

    var title = '';

    if(typeof(this.props.article) !== 'undefined'){
      title = this.props.article.name;
    }


    return <div className="article-information">
       {title}
    </div>;
  }
}

ArticleInformation.propTypes = {
  article: React.PropTypes.object
}

module.exports = ArticleInformation;
