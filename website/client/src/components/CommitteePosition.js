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
		_id: this.props.match.params._id,
		loaded: false
	};


	componentDidMount() {
		axios
			.get("/committee/" + this.state._id)
			.then(response => {
				const position = response.data;

				const newState = Object.assign(
					{},
					this.state,
					{ ...position, loaded: true }
				);
				this.setState(newState);
			})
			.catch(error => {
				console.log(error.response);
			});
	}


	render() {
		const {
			loaded,

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

		const createdDate = created ? new Date(created).toDateString() : "Unknown";
		const modifiedDate = modified ? new Date(modified).toDateString() : "Unknown";
		const datesContent = (created || modified) ?
			<div>
				<Header size="small">Date created</Header>
				<Item>{createdDate}</Item>
				<Header size="small">Last modified</Header>
				<Item>{modifiedDate}</Item>
			</div>
			: null;

		return (
			<div>
				<Header size="huge"><Icon name="info circle" />{title}</Header>
				
				<Header size="large">User</Header>
				<Segment loading={!loaded}>
					{userData}
				</Segment>

				<Header size="large">Description and responsibilities</Header>
				<Segment loading={!loaded} style={{ whiteSpace: "pre-line" }}>
					{description ? description : "None given"}
				</Segment>

				{datesContent}

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