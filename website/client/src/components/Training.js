import React, { Component } from "react";
import { Link } 			from "react-router-dom";
import {
	Header
}							from "semantic-ui-react";


class Training extends Component {

	render() {
		return (
			<div>
				<Header size="huge">Learn to skydive solo!</Header>
				Do like the idea of jumping out of perfectly good aeroplanes, over and over again?
				
				<Header size="large">Category System (CS)</Header>
				Category System (CS) - also known as 'Static Line' or RAPS (Ram Air Progression System) - is typically the cheapest method of learning to skydive.
				<Header size="large">Accelerated Freefall (AFF)</Header>
				Training page
			</div>
		);
	}
}


export default Training;