import React, { Component } from "react";
import { Link } 			from "react-router-dom";
import {
	Header,
	Divider
}							from "semantic-ui-react";


class Training extends Component {

	render() {
		const introContent = (
			<div>
				<p>
					Do you like the idea of jumping out of perfectly good aeroplanes, over and over again?
				</p>
				<p>
					We certainly do!
				</p>
				<p>
					Your time at University is the best time to start skydiving as a hobby.
					Not only will you be part of a great community and have access to national University events,
					learning to skydive as part of a student club is significantly cheaper than going to the dropzone
					by yourself once you've graduated!
				</p>
				<p>
					Once you become a <i>qualified</i> skydiver, you are presented with a BPA (British Parachute Association) licence book,
					with which you are then permitted to turn up to almost any dropzone around the world and skydive!
				</p> 
				<p>
					Becoming qualified means obtaining your <strong>A licence</strong>.
					This can be done through one of two possible training methods - <strong>CS</strong> and <strong>AFF</strong>.
				</p>
				<p>
					Both methods have their pros and cons but, ultimately, they both get you the same qualification and both mean you get to jump out of planes in your spare time! 
				</p>
			</div>
		);

		const csContent = (
			<div>
				<p>
					Category System - also known as <strong>Static Line</strong> or <strong>RAPS</strong> (Ram Air Progression System) - is typically the cheapest method of learning to skydive.
				</p>
				<p>
					Before all the fun stuff happens, you first undertake an important 6 hours of <strong>ground training</strong>.
					This typically occurs on a single day and teaches you everything you need to know to safely do your first jump.
				</p>
				<p>
					To begin with, you jump out of the plane at roughly <strong>3500-4000ft</strong>.
					Your parachute's deployment bag is attached to the plane via a <strong>static line</strong>;
					this opens your parachute (often called a <strong>canopy</strong>) automatically, as soon as you exit.
					Because of this, you don't have as much to think about during the jump as your friends doing AFF, who have to remember the freefall side of things as well! 
				</p>
				<p>
					Once you've done a few more jumps, you progress onto freefall, where you are responsible for deploying your own canopy.
				</p>
				<p>
					The altitude that you jump from then gradually increases, giving you more and more freefall time each jump, until you eventually start exiting the plane at <strong>15,000ft</strong>.
					At this point, you get around <strong>60s</strong> of freefall time per jump!
				</p>
				<p>
					After a few more jumps practicing your freefall skills, you do a qualification jump. If you pass that, you receive your <strong>A licence</strong> and are then a <strong>qualified skydiver</strong>!
				</p>
			</div>
		);

		const affContent = (
			<div>
				<p>AFF is this...</p>
			</div>
		);

		return (
			<div>
				<Header size="huge">Learn to Skydive Solo!</Header>
				{introContent}
	
				<Divider horizontal section>Option A</Divider>

				<Header size="medium">Category System (CS)</Header>
				{csContent}
				
				<Divider horizontal section>Option B</Divider>

				<Header size="large">Accelerated Freefall (AFF)</Header>
				{affContent}

			</div>
		);
	}
}


export default Training;