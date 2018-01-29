const monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const today = new Date();

class Calendar {
	constructor() {
		console.log("Creating calendar...");

		this.table = $("#calendarTable")[0];
		if(!this.table) {
			return console.log("No object with id 'calendarTable' found!");
		}

		this.yearLabel = $("#calendarYearLabel")[0];
		if(!this.yearLabel) {
			return console.log("No object with id 'calendarYearLabel' found!");
		}

		this.monthLabel = $("#calendarMonthLabel")[0];
		if(!this.monthLabel) {
			return console.log("No object with id 'calendarMonthLabel' found!");
		}


		this.selectedMonth = today.getMonth();
		this.selectedYear = today.getFullYear();

		this.dayClickedCallback = null;

		this.update();

		console.log("Calendar created.");
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


var calendar;
$(document).ready(function() {
	calendar = new Calendar();

	calendar.dayClickedCallback = function(day, month, year) {
		alert("Calendar day clicked... " + day + "-" + (month+1) + "-" + year);
	};
});