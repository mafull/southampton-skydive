import React, { Component } from "react"
import PropTypes from "prop-types"


class RigListElement extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired
	};


	static defaultProps = {
		name: "n/a"
	};


	render() {
		const {name} = this.props;

		return (
			<div className="four wide column">
				<div className="item">
					<div className="content">
						<a className="ui huge header" href="/rigs/<%= rig._id %>">{name}</a>
						<div className="meta">
							<span>MODEL + SIZE</span>
						</div>
						<div className="description">

						</div>
						<div className="extra">
							<a className="ui floated basic blue button" href="/rigs/<%= rig._id %>">Select</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default RigListElement;