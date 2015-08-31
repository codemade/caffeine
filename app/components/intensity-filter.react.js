var React = require('react');

class IntensityFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let intensityFilterItems = [];
    for(let index = 0; index < this.props.maximumIntensity; index++) {
      intensityFilterItems.push(<div className="intensity-filter-item">{index+1}</div>)
    }
    
    return <div className="intensity-filter">
      {intensityFilterItems}
    </div>
  }
}

module.exports = IntensityFilter;
