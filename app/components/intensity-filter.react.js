var React = require('react');

class IntensityFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let intensityFilterItems = [];
    for(let index = 0; index < this.props.maximumIntensity; index++) {
      let className = this.props.availableIntensities.indexOf(index+1) > -1
        ? 'intensity-filter-item'
        : 'intensity-filter-item disabled';
      intensityFilterItems.push(<div className={className}>{index+1}</div>)
    }

    return <div className="intensity-filter">
      {intensityFilterItems}
    </div>
  }
}
IntensityFilter.propTypes = {
  maximumIntensity: React.PropTypes.Number,
  availableIntensities: React.PropTypes.Array
};
module.exports = IntensityFilter;
