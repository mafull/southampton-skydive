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
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		equipment: PropTypes.shape({
			main: PropTypes.shape({
				model: PropTypes.string,
				size: PropTypes.number
			})
		})
	};


	static defaultProps = {
		_id: "",
		name: "n/a",
		equipment: {
			main: {
				model :"",
				size: ""
			}
		}
	};


	render() {
		const { _id, name, equipment: { main } } = this.props;

		return (
			<Grid.Column width="4" verticalAlign="middle">
				<Item>
					<Item.Content>
						<Header size="huge" as={Link} to={"/rigs/" + _id}>{name}</Header>
						<Item.Meta>
							<span>{main.model} {main.size}</span>
						</Item.Meta>
						<Item.Description>

						</Item.Description>
					</Item.Content>
				</Item>
			</Grid.Column>
		);
	}
}


export default RigListElement;