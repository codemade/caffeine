let React = require('react');

let IntensityFilter = React.createClass({
  render() {
    let intensityFilterItems = [];
    for (let intensity = 1; intensity <= this.props.maximumIntensity; intensity++) {
      let className = this.props.availableIntensities.indexOf(intensity) > -1
        ? 'intensityFilter__item'
        : 'intensityFilter__item intensityFilter__item--unavailable';
      let selectIntensity = () => { this.props.actionCreator.filterByIntensity(intensity); };
      intensityFilterItems.push(<span key={intensity} className={className} onClick={selectIntensity}>{intensity}</span>);
    }

    return <div className="componentIndicator intensityFilter">
      <div className="intensityFilter__legend">Nach Intensität filtern</div>
      {intensityFilterItems}
    </div>;
  }
});

IntensityFilter.propTypes = {
  actionCreator: React.PropTypes.object.isRequired,
  maximumIntensity: React.PropTypes.number.isRequired,
  availableIntensities: React.PropTypes.array.isRequired
};
module.exports = IntensityFilter;
