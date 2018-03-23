import React, { Component } from "react";
import PropTypes 			from "prop-types";
import { Link } 			from "react-router-dom";
import {
	Grid,
	Header,
	Item,
	Button
}							from "semantic-ui-react";


class RigListElement extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		equipment: PropTypes.shape({
			main: PropTypes.shape({
				model: PropTypes.string,
				size: PropTypes.number
			})
		})
	};


	static defaultProps = {
		name: "n/a",
		equipment: {
			main: {
				model :"",
				size: ""
			}
		}
	};


	render() {
		const { id = 69, name, equipment: { main } } = this.props;

		return (
			<Grid.Column width="4">
				<Item>
					<Item.Content>
						<Header size="huge" as={Link} to={"/rigs/" + id}>{name}</Header>
						<Item.Meta>
							<span>{main.model} {main.size}</span>
						</Item.Meta>
						<Item.Description>

						</Item.Description>
						<Item.Extra>
							<Button basic color="blue" as={Link} to={"/rigs/" + id}>Select</Button>
						</Item.Extra>
					</Item.Content>
				</Item>
			</Grid.Column>
		);
	}
}


export default RigListElement;