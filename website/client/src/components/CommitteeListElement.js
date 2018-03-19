import React, { Component } from "react"
import PropTypes 			from "prop-types"


class UserListElement extends Component {
	static propTypes = {
		position: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired
	};


	static defaultProps = {
		position: "n/a",
		name: "n/a",
		email: "n/a"
	};


	render() {
		const {position, name, email} = this.props;

		return (
			<tr>
				<td>{position}</td>
				<td><a href="/#">{name}</a></td>
				<td>{email}</td>
			</tr>
		);
	}
}


export default UserListElement;