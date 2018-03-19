import React, { Component } from "react"
import PropTypes 			from "prop-types"


class UserListElement extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired
	};


	static defaultProps = {
		name: "n/a",
		email: "n/a"
	};


	render() {
		const {name, email} = this.props;

		return (
			<tr>
				<td><a href="/#">{name}</a></td>
				<td>{email}</td>
			</tr>
		);
	}
}


export default UserListElement;