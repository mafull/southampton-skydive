import React, { Component } from "react";
import axios				from "axios";
import { Link } 			from "react-router-dom";
import {
	Header,
	Icon,
	Segment,
	Item,
	Button
}							from "semantic-ui-react";


class CommitteePosition extends Component {
	state = {
		_id: this.props.match.params._id
	};


	componentDidMount() {
		axios
			.get("/committee/" + this.state._id)
			.then(response => {
				const position = response.data;

				const newState = Object.assign(
					{},
					this.state,
					{ ...position }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const {
			title,
			user,
			description,
			created,
			modified
		} = this.state;

		const userData = user ? 
			<div>
				<Header>Name</Header>
				<Item>
					<Link to={"/users/" + user._id}>{user.forename + " " + user.surname}</Link>
				</Item>
				<Header>Email</Header>
				<Item>
					<a href={"mailto:" + user.email}>{user.email}</a>
				</Item>				
			</div>
			: "Unassigned";

		const createdDate = created ? new Date(created).toDateString() : null;
		const modifiedDate = modified ? new Date(modified).toDateString() : null;

		return (
			<div>
				<Header size="huge"><Icon name="info circle" />{title}</Header>
				
				<Header size="large">User</Header>
				<Segment>
					{userData}
				</Segment>

				<Header size="large">Description and responsibilities</Header>
				<Segment>
					{description ? description : "None given"}
				</Segment>

				<Header size="small">Date created</Header>
				<Item>{createdDate}</Item>
				<Header size="small">Last modified</Header>
				<Item>{modifiedDate}</Item>

				<Button
					color="blue"
					inverted
					style={{marginTop: "10px"}}
					as={Link}
						to="/committee/">
					Go back
				</Button>
			</div>
		);
	}
} 


export default CommitteePosition;