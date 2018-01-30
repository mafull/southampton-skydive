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
		this.docObject.className += " ui mini modal";

		// Create header
		let header = document.createElement("div");
		header.className = "ui icon header";
		let i = document.createElement("i");
		i.className = "calendar icon";
		header.appendChild(i);
		this.headerText = document.createElement("span");
		this.headerText.innerText = "?";
		header.appendChild(this.headerText);
		this.docObject.appendChild(header);

		// Create content
		let content = document.createElement("div");
		content.className = "content";
		this.mainText = document.createElement("div");
		this.mainText.innerText = "?";
		this.mainText.style.textAlign = "center";
		content.appendChild(this.mainText);
		// Booking management
		let headerForm = document.createElement("header");
		headerForm.className = "ui center aligned small header";
		headerForm.innerText = "Manage your booking";
		headerForm.style.marginBottom = "5px";
		content.appendChild(headerForm);
		this.manageContainer = document.createElement("div");
		this.manageContainer.className = "ui center aligned segment";
		this.manageContainer.style.margin = "0px auto";
		this.manageText = document.createElement("div");
		this.manageText.style.display = "none";
		this.manageContainer.appendChild(this.manageText);
		content.appendChild(this.manageContainer);
		// New booking form
		this.newForm = document.createElement("form");
		this.newForm.className = "ui form";
		this.newForm.style.display = "none";
		// T&C checkbox
		let divCb = document.createElement("div");
		divCb.className = "ui checkbox";
		this.agreeCheckbox = document.createElement("input");
		this.agreeCheckbox.type = "checkbox";
		let _this = this;
		this.agreeCheckbox.onchange = function() {
			if(this.checked) {
				field.classList.remove("disabled");
				_this.buttonBook.classList.remove("disabled");
			} else {
				field.classList.add("disabled");				
				_this.buttonBook.classList.add("disabled");
			}
		};
		divCb.appendChild(this.agreeCheckbox);
		let labelCb = document.createElement("label");
		labelCb.innerHTML = "I accept the <a>terms and conditions</a>";
		divCb.appendChild(labelCb);
		this.newForm.appendChild(divCb);
		this.manageContainer.appendChild(this.newForm);
		this.docObject.appendChild(content);
		// Dropdown
		let field = document.createElement("div");
		field.className = "ui disabled inline field";
		field.style.marginBottom = "0px";
		let labelField = document.createElement("label");
		labelField.innerText = "Usage";
		field.appendChild(labelField);
		this.requirementDropdown = document.createElement("select");
		this.requirementDropdown.className = "ui selection dropdown";
		let option = document.createElement("option");
		option.value = "Fun jumping";
		option.innerText = "Fun jumping";
		this.requirementDropdown.appendChild(option);
		option = document.createElement("option");
		option.value = "Coaching";
		option.innerText = "Coaching";
		this.requirementDropdown.appendChild(option);
		option = document.createElement("option");
		option.value = "Competition";
		option.innerText = "Competition";
		this.requirementDropdown.appendChild(option);
		field.appendChild(this.requirementDropdown);
		this.newForm.appendChild(field);
		// Button
		this.buttonBook = document.createElement("button");
		this.buttonBook.className = "ui disabled fluid positive button";
		this.buttonBook.innerText = "Book";
		this.newForm.appendChild(this.buttonBook);


		// Cancel booking form
		this.cancelForm = document.createElement("form");
		this.cancelForm.className = "ui form";
		this.cancelForm.style.display = "none";
		this.manageContainer.appendChild(this.cancelForm);
		// Button
		this.buttonCancel = document.createElement("button");
		this.buttonCancel.className = "ui disabled fluid negative button";
		this.buttonCancel.innerText = "Cancel";
		this.cancelForm.appendChild(this.buttonCancel);














		// Create actions
		let actions = document.createElement("div");
		actions.className = "actions";
		let buttonDone = document.createElement("div");
		buttonDone.className = "ui primary ok button";
		buttonDone.innerText = "Done";
		actions.appendChild(buttonDone);
		this.docObject.appendChild(actions);

		$(".ui.dropdown").dropdown();
		//$(".ui.checkbox").checkbox();
	}


	show(user, rig, date) {
		this.user = user;
		this.rig = rig;
		this.date = date;
		
		this.update();

		// Have to call modal() on array of modals ??
		$(".rig-booking-modal").modal("show");
	}


	update() {
		// Update header text
		this.headerText.innerHTML = this.rig.name + " on "
			+ this.date.toLocaleString("en-uk", {weekday: "short"}) + " "
			+ this.date.getDate() + " "
			+ this.date.toLocaleString("en-uk", {month: "short"}) + " "
			+ this.date.getFullYear();

		// Update main content
		let html = "";
		// Current bookings
		let existingBooking = false;
		html += "<header class=\"ui center aligned small header\">Current booking priority:</header>";
		html += "<div class=\"ui center aligned segment\">";
		let currentBookings = this.getCurrentBookings();
		if(currentBookings.length === 0) {
			// No bookinhgs
			html += "None";
		} else {
			html += "<div class=\"ui relaxed list\" style=\"width: 50%; margin: 5px auto;\">";
			currentBookings.forEach((booking) => {
				if(this.user && (booking.user._id === this.user._id)) {
					existingBooking = true;
				}

				html += (existingBooking ? "<em>" : "")
					+ "<div class=\"item\">"
					+ "<span style=\"float: left;\">" + (booking.priority+1) + "</span>"
					+ "<div class=\"content\">"
					+ "<a class=\"header\" href=\"/users/" + booking.user._id + "\">" + booking.user.forename + " " + booking.user.surname + "</a>"
					+ "<div class=\"description\">"
					+ (booking.user.hasMembership ? "Member" : "Non-member")
					+ (booking.requirement !== "" ? (", " + booking.requirement) : "")
					+ "</div>"
					+ "</div>"
					+ (existingBooking ? "</em>" : "")
					+ "</div>";
			});
			html += "</div></div>";
		}
		this.mainText.innerHTML = html;
		// Book/cancel etc.
		if(!this.user) {
			// Not logged in
			this.manageText.innerHTML = "Please <a href=\"/login\">log in</a> to manage your booking";
			this.manageText.style.display = "block";
		} else if(!this.rig.approvedUsers.find((user) => user._id === this.user._id)) {
			// Not approved
			this.manageText.innerHTML = "You are not approved to use this rig<br><a href=\"\">Request approval</a>";
			this.manageText.style.display = "block";
		} else {
			// Logged in and approved

			if(existingBooking) {
				// Existing booking - give option to cancel
				this.manageText.style.display = "none";
				this.cancelForm.style.display = "block";
				this.newForm.style.display = "none";

			} else {
				// No existing booking - give option to book
				this.manageText.style.display = "none";
				this.cancelForm.style.display = "none";
				this.newForm.style.display = "block";
			}
		}
	}

	
	getCurrentBookings() {
		let currentBookings = [];

		// Grab all bookings for the selected date
		this.rig.status.bookings.forEach((booking) => {
			// Convert to date format
			booking.date = new Date(booking.date);

			if(
				(booking.date.getFullYear() === this.date.getFullYear()) &&
				(booking.date.getMonth() === this.date.getMonth()) &&
				(booking.date.getDate() === this.date.getDate())) {
				currentBookings.push(booking);
			}
		});

		// Sort by priority
		currentBookings.sort(function(a, b) {return (a.priority < b.priority) ? -1 : ((b.priority < a.priority) ? 1 : 0);});

		return currentBookings;
	}
};

$(document).ready(function() {
	let rigBookingModals = RigBookingModal.createAll();

	if(typeof configureRigBookingModals === "function") {
		configureRigBookingModals(rigBookingModals);
		console.log("Rig booking modals configured.");
	}
});