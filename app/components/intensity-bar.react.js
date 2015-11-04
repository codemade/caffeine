let React = require('react');

let IntensityBar = React.createClass({
  render() {
    let dots = [];
    let className = 'dot-on';
    for (let i = 0; i < 12; i++) {
      if (i >= this.props.intensity) {
        className = 'dot-off';
      }
      let key = 'intensity-bar-item-' + i;
      dots.push(<span key={key} className={className}></span>);
    }
    return <div className="intensity-bar">
      {dots}
    </div>;
  }
});

IntensityBar.propTypes = {
  intensity: React.PropTypes.number.isRequired
};
module.exports = IntensityBar;
