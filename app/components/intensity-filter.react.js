var React = require('react');

class IntensityFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let intensityFilterItems = [];
    for(let intensity = 1; intensity <= this.props.maximumIntensity; intensity++) {
      let className = this.props.availableIntensities.indexOf(intensity) > -1
        ? 'intensity-filter-item'
        : 'intensity-filter-item unavailable';
      let selectIntensity = () => { this.props.actionCreator.filterByIntensity(intensity)};
      intensityFilterItems.push(<span className={className} onClick={selectIntensity}>{intensity}</span>)
    }

    return <div className="intensity-filter">
      <div className="legend">Nach Intensität filtern</div>
      {intensityFilterItems}
    </div>
  }
}
IntensityFilter.propTypes = {
  actionCreator: React.PropTypes.object.isRequired,
  maximumIntensity: React.PropTypes.number.isRequired,
  availableIntensities: React.PropTypes.array.isRequired
};
module.exports = IntensityFilter;
