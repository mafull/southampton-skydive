const monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const today = new Date();

class Calendar {
	static createAll() {
		let containers = $(".calendar-container");
		let calendars = [];

		for(var i = 0; i < containers.length; i++) {
			calendars.push(new Calendar(containers[i]));
		}

		return calendars;
	}


	constructor(container) {
		this.container = container;

		console.log("Creating calendar...");

		this.create();

		this.selectedMonth = today.getMonth();
		this.selectedYear = today.getFullYear();

		this.dayClickedCallback = null;

		this.update();

		console.log("Calendar created.");
	}


	create() {
		// Reference for use in callback functions
		let _this = this;

		// Create the table
		this.table = document.createElement("table");
		this.table.className = "ui seven column large celled table";
		this.container.appendChild(this.table);

		// Create head, body, foot
		let thead = document.createElement("thead");
		let tbody = document.createElement("tbody");
		let tfoot = document.createElement("tfoot");
		this.table.appendChild(thead);
		this.table.appendChild(tbody);
		this.table.appendChild(tfoot);

		// Create head rows and headers
		let rowHTop = document.createElement("tr");
		let rowHBottom = document.createElement("tr");
		rowHBottom.className = "center aligned";
		thead.appendChild(rowHTop);
		thead.appendChild(rowHBottom);
		let thTop = document.createElement("th");
		thTop.colSpan = 9;
		thTop.className = "center aligned";
		rowHTop.appendChild(thTop);

		// Create year and month labels
		let divYear = document.createElement("div");
		divYear.className = "ui ribbon label";
		divYear.style = "float: left;";
		thTop.appendChild(divYear);
		this.yearLabel = document.createElement("span");
		this.yearLabel.innerText = "?";
		divYear.appendChild(this.yearLabel);
		this.monthLabel = document.createElement("span");
		this.monthLabel.style = "margin-right: 10%;";
		this.monthLabel.textContent = "?";
		thTop.appendChild(this.monthLabel);

		// Create day of week labels
		let dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		for(var d = 0; d < 7; d++) {
			let th = document.createElement("th");
			th.innerText = dayLabels[d];
			rowHBottom.appendChild(th);
		}

		// Create day cells
		for(var row = 0; row < 6; row++) {
			// Create the row
			let row = document.createElement("tr");
			tbody.appendChild(row);

			// Create each cell
			for(var col = 0; col < 7; col++) {
				let cell = document.createElement("td");
				cell.className = "selectable center aligned";
				cell.onclick = function() {
					_this.dayClicked(
						this.getAttribute("day"),
						this.getAttribute("month"),
						this.getAttribute("year"));
				};

				let anch = document.createElement("a");
				anch.innerText = "?";
				cell.appendChild(anch);

				row.appendChild(cell);
			}
		}

		// Create foot elements
		let tr = document.createElement("tr");
		tfoot.appendChild(tr);
		let th = document.createElement("th");
		th.colSpan = 7;
		let buttonPrev = document.createElement("button");
		buttonPrev.className = "ui tiny left floated icon button";
		buttonPrev.onmousedown = function() { _this.changeMonthClicked(false); };
		let i = document.createElement("i");
		i.className = "left chevron icon";
		buttonPrev.appendChild(i);
		th.appendChild(buttonPrev);
		let buttonNext = document.createElement("button");
		buttonNext.className = "ui tiny right floated icon button";
		buttonNext.onmousedown = function() { _this.changeMonthClicked(true); };
		i = document.createElement("i");
		i.className = "right chevron icon";
		buttonNext.appendChild(i);
		th.appendChild(buttonNext);
		tr.appendChild(th);
	}


	update() {
		this.updateMonthLabel();
		this.updateYearLabel();

		var totalDaysPrev = Calendar.daysInMonth(this.selectedMonth - 1, this.selectedYear);
		var totalDays = Calendar.daysInMonth(this.selectedMonth, this.selectedYear);

		var startDayOfWeek = (new Date(this.selectedYear, this.selectedMonth, 1)).getDay() - 1;

		var index = 0;
		var counter = 0;
		var day, month, year;
		var currMonth = this.selectedMonth;
		var currYear = this.selectedYear;
	    for(var row = 0; row < 6; row++) {
	    	for(var col = 0; col < 7; col++) {
	    		if(row == 0 && (col < startDayOfWeek)) {
	    			month = currMonth - 1;
	    			if(month == -1) {
	    				month = 11;
	    				year = currYear - 1;
	    			} else {
	    				year = currYear;
	    			}
					day = (totalDaysPrev - (startDayOfWeek - (col + 1)));
				} else {
					year = currYear;
					month = currMonth;
					day = index + 1;
					
					if(++index == totalDays) {
						currMonth++;
						if(currMonth == 12) {
							currMonth = 0;
							currYear++;
						}
	    				index = 0;
	    			}
	    		}

	    		var html
	    		if((counter == 0 && index >= today.getDate()) ||
	    		   (counter != 0 && counter < 6)) {
	    			counter++;
	    			html = "<a><strong>"+day+"</strong></a>";
	    		} else {
	    			html = "<a><em>"+day+"</em></a>";
	    		}

	    		var cell = this.table.tBodies[0].rows[row].cells[col];
	    		cell.innerHTML = html;
	    		cell.setAttribute("day", day);
	    		cell.setAttribute("month", month);
	    		cell.setAttribute("year", year);

	    		switch(col) {
	    			case 0: case 1: case 3:
	    				// Non-jumping days - Blank
	    				break;
	    			default:
	    				// Jumping days - Green
	    				cell.classList.add("positive");	
	    		}
	    	}
	    }
	}


	changeMonthClicked(up) {
		this.selectedMonth += up ? 1 : -1;
		if(this.selectedMonth == 12) {
			this.selectedYear++;
			this.selectedMonth = 0;
		} else if(this.selectedMonth == -1) {
			this.selectedYear--;
			this.selectedMonth = 11;
		}
		this.update();
	}


	static daysInMonth(month, year)
	{
		return 32 - new Date(year, month, 32).getDate();
	}


	updateYearLabel() {
		this.yearLabel.textContent = this.selectedYear;
	}

	updateMonthLabel() {
		this.monthLabel.textContent = monthStrings[this.selectedMonth];
	}


    dayClicked(day, month, year) {
    	month = parseInt(month);

    	if(!this.dayClickedCallback) {
    		console.log("No callback assigned for 'dayClicked'!");
    	} else {
    		this.dayClickedCallback(day, month, year);
    	}
    }
};


$(document).ready(function() {
	var calendars = Calendar.createAll();	

	calendars[0].dayClickedCallback = function(day, month, year) {
		alert("Calendar day clicked... " + day + "-" + (month+1) + "-" + year);
	};
});
