
var time = 0;
var timer;
var timerON = false;
var start = 0;
var end = 0;
var times = [];

										
var scramble_moves = ["U", "D", "L", "R", "F", "B",	
							"U'", "D'", "L'", "R'", "F'", "B'",
							"2U", "2D", "2L", "2R", "2F", "2B"];
var scramble_length = 15;
			




init();

function init() {
	document.getElementById("scramble").innerHTML = generateScramble();
}


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Returns a list of SCRAMBLE_LENGTH number of moves
function generateScramble() {
	
	var scramble = [];
	scramble.push(scramble_moves[randomNumber(0, scramble_moves.length-1)]);
	
	var i = 1;
	while(scramble.length < scramble_length) {
		var current_move = scramble_moves[randomNumber(0, scramble_moves.length-1)];
		var previous_move = scramble[i-1];
		
		if(current_move != previous_move) {
			if( (current_move.length == 2 && previous_move.length == 2) && (current_move.charAt(0) == previous_move.charAt(0))) {
				continue;
			}
			
			if(Math.abs(current_move.length - previous_move.length) == 1 && current_move.charAt(0) == previous_move.charAt(0)) {
				continue;
			}
	
			scramble.push(current_move);
			i += 1;		
		}
	}
	
	return scramble;	
}


function startTimer() {
	timerON = true;
	start = new Date().getTime();
	
	timer = window.setInterval(function() {
		
		time += 1; 
		document.getElementById("timer").innerHTML = time;
		
	}, 1000);

}

function stopTimer() {
	window.clearTimeout(timer);
	timerON = false;
	
	end = new Date().getTime();
}



function getBestTime() {
	var min = 10000000000000;
	
	for(var i = 0; i < times.length; i++) {
		if(times[i] < min) {
			min = times[i];
		}
	}
	
	return min;
	
}

function getWorstTime() {
	var max = -1;
	
	for(var i = 0; i < times.length; i++) {
		if(times[i] > max) {
			max = times[i];
		}
	}
	
	return max;
}

function updateTimesList() {
	var times_list = document.getElementById("times_list");

	while(times_list.firstChild) {
		times_list.removeChild(times_list.firstChild);
	}
	
	for(var i = 0; i < times.length; i++) {
		var entry = document.createElement("li");
		entry.innerHTML = (i+1).toString() + ": --- " + getRoundedNumberString(times[i]) + "s";
		entry.setAttribute("class", "time_entry");
		
		times_list.appendChild(entry);

	}
}

function getAverageOfN(N) {
	var sum = 0;
	
	for(var i = 0; i < N; i++) {
		sum += times[i];
	}
	
	return sum / N;
}

//Returns number to two decimal places and truncates the rest.
function getRoundedNumberString(number) {
	var decimalPosition = number.toString().indexOf(".");
	return number.toString().substr(0, decimalPosition+3);
}

//Updates the values for statistics and time list
function update() {
	times.push((end-start) / 1000);
	updateTimesList();
			
	time = 0;
	document.getElementById("timer").innerHTML = "0"; //reset it back to 0 with two decimal places.
			
	document.getElementById("scramble").innerHTML = generateScramble(scramble_length).toString();
	
	
	if(times.length > 0) {
		document.getElementById("time_best").innerHTML = "Best Time: " + getRoundedNumberString(getBestTime());
		document.getElementById("time_worst").innerHTML = "Worst Time: " + getRoundedNumberString(getWorstTime());
		
		
		document.getElementById("time_average").innerHTML = "Average: " + getRoundedNumberString(getAverageOfN(times.length));
		
		
		if(times.length >= 5) {
			document.getElementById("time_average_of_5").innerHTML = "Average of 5: " + getRoundedNumberString(getAverageOfN(5));
		}
		
		if(times.length >= 12) {
			document.getElementById("time_average_of_12").innerHTML = "Average of 12: " + getRoundedNumberString(getAverageOfN(12));
		}
		
		if(times.length >= 25) {
			document.getElementById("time_average_of_25").innerHTML = "Average of 25: " + getRoundedNumberString(getAverageOfN(25));
		}
		
		if(times.length >= 50) {
			document.getElementById("time_average_of_50").innerHTML = "Average of 50: " + getRoundedNumberString(getAverageOfN(50));
		}	
	}
}



document.addEventListener("keyup", function(event) {
	
	//If [SPACEBAR] is pressed start and stop timer.
	if(event.keyCode === 32) {
		
		event.preventDefault();
		
		if(timerON) {
			stopTimer();
			update();
			document.body.style.background = "#F2E9DC";
		} else {
			startTimer();
			document.body.style.background = "#96FFC2";
		}
	}
	
});

document.addEventListener("keydown", function(event) {
	//Prevent scrolling when pressing spacebar.
	if(event.keyCode === 32) {	
		event.preventDefault();
	}
});


