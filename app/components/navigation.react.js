let React = require('react');

let Navigation = React.createClass({
	showComponentIndicators() {
		document.body.className = 'showIndicators';
	},

	hideComponentIndicators() {
		document.body.className = '';
	},

	render() {
		return <div className="componentIndicator mainNavigation">
			<nav className="container">
				<ul className="row">
					<li className="mainNavigation__navItem col-xs-6">
						<span className="mainNavigation__logo" onMouseDown={this.showComponentIndicators} onMouseUp={this.hideComponentIndicators}></span>
						<h1 className="mainNavigation__brandName">Coffee Store</h1>
					</li>
					<li className="mainNavigation__navItem col-xs-6 align-right">{this.props.children}</li>
				</ul>
			</nav>
		</div>;
	}
});

module.exports = Navigation;
