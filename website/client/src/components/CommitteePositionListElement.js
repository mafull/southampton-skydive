import React, { Component } from "react";
import PropTypes 			from "prop-types";
import { Link }				from "react-router-dom";
import {
	Table
}							from "semantic-ui-react";


class CommitteePositionListElement extends Component {
	static propTypes = {
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		userId: PropTypes.string,
		name: PropTypes.string,
		email: PropTypes.string
	};


	static defaultProps = {
		_id: "",
		title: "n/a",
		userId: "",
		name: "",
		email: ""
	};


	render() {
		const {
			_id,
			title,
			userId,
			name,
			email } = this.props;

		return (
			<Table.Row>
				<Table.Cell><Link to={"/committee/" + _id}>{title}</Link></Table.Cell>
				<Table.Cell><Link to={"/users/" + userId}>{name}</Link></Table.Cell>
				<Table.Cell><a href={"mailto:" + email}>{email}</a></Table.Cell>
			</Table.Row>
		);
	}
}


export default CommitteePositionListElement;