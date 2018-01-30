class RigBookingModal {
	static createAll() {
		let docObjects = $(".rig-booking-modal");
		let rigBookingModals = [];

		for(var i = 0; i < docObjects.length; i++) {
			rigBookingModals.push(new RigBookingModal(docObjects[i]));
		}

		return rigBookingModals;
	}


	constructor(docObject) {
		this.docObject = docObject;

		console.log("Creating rig booking modal...");

		this.create();

		console.log("Rig booking modal created.");
	}


	create() {
		// Create modal div
		this.docObject.className += " ui modal";

		// Create header
		let header = document.createElement("div");
		header.className = "ui icon header";
		let i = document.createElement("i");
		i.className = "calendar icon";
		header.appendChild(i);
		let pHeader = document.createElement("p");
		pHeader.innerText = "Rig booking modal";
		header.appendChild(pHeader);
		this.docObject.appendChild(header);

		// Create content
		this.content = document.createElement("div");
		this.content.className = "content";
		this.content.innerText = "Content goes here";
		this.docObject.appendChild(this.content);

		// Create actions
		let actions = document.createElement("div");
		actions.className = "actions";
		let buttonDone = document.createElement("div");
		buttonDone.className = "ui primary ok button";
		buttonDone.innerText = "Done";
		actions.appendChild(buttonDone);
		this.docObject.appendChild(actions);
	}


	show(date) {
		this.date = date;
		this.content.innerHTML = "Date is: <strong>" + this.date.toDateString() + "</strong>";
		//this.update();

		// Have to call modal() on array of modals ??
		$(".rig-booking-modal").modal("show");
	}
};

$(document).ready(function() {
	let rigBookingModals = RigBookingModal.createAll();

	if(typeof configureRigBookingModals === "function") {
		configureRigBookingModals(rigBookingModals);
		console.log("Rig booking modals configured.");
	}
});