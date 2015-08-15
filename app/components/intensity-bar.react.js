var React = require('react');


class IntensityBar extends React.Component {
    render(){
        var dots = [];
        var className = 'dot-on';
        for(var i = 0; i < 12; i++){
            if(i >= this.props.intensity) {
                className = 'dot-off';
            }
            dots.push(<span className={className}></span>);
        }
        return <div className="intensity-bar">
        {dots}
        </div>;
    }
}

module.exports = IntensityBar;
