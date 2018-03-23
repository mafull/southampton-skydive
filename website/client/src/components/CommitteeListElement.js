import React, { Component } from "react";
import PropTypes 			from "prop-types";
import { Link }				from "react-router-dom";
import {
	Table
}							from "semantic-ui-react";


class UserListElement extends Component {
	static propTypes = {
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		name: PropTypes.string,
		email: PropTypes.string
	};


	static defaultProps = {
		_id: "",
		title: "n/a",
		name: "",
		email: ""
	};


	render() {
		const { _id, title, name, email } = this.props;

		return (
			<Table.Row>
				<Table.Cell><Link to={"/committee/" + _id}>{title}</Link></Table.Cell>
				<Table.Cell><Link to="/#">{name}</Link></Table.Cell>
				<Table.Cell><a href={"mailto:" + email}>{email}</a></Table.Cell>
			</Table.Row>
		);
	}
}


export default UserListElement;