import React, { Component } from "react";


class Footer extends Component {
	render() {
		return (
			<p
				style={{
					textAlign: "center",
					paddingBottom: "15px"
				}}>
				<em>{"\u00A9"} 2018 - Max Fuller, University of Southampton Skydive Club</em>
			</p>
		);
	}
};


export default Footer;
