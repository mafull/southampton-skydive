import React, { Component } from "react";
import PropTypes 			from "prop-types";
import { Link }				from "react-router-dom";
import {
	Table
}							from "semantic-ui-react";


class UserListElement extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		name: PropTypes.string,
		email: PropTypes.string
	};


	static defaultProps = {
		title: "n/a",
		name: "",
		email: ""
	};


	render() {
		const {title, name, email} = this.props;

		return (
			<Table.Row>
				<Table.Cell>{title}</Table.Cell>
				<Table.Cell><Link to="/#">{name}</Link></Table.Cell>
				<Table.Cell>{email}</Table.Cell>
			</Table.Row>
		);
	}
}


export default UserListElement;