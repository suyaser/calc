let runningTotal = 0;
let buffer = "0";
let previousOp;
const screen = document.querySelector(".screen");

document.querySelector(".calc-buttons").addEventListener("click", function(event) {
	buttonsClick(event.target.innerText);
})

function buttonsClick(value) {
	if(isNaN(parseInt(value))) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	rerender();
}

function handleNumber(value) {
	if(buffer === "0") {
		buffer = value;
	} else {
		buffer += value;
	}
}

function handleSymbol(value) {
	switch(value) {
		case "C":
			buffer = "0";
			runningTotal = 0;
			break;
		case "=":
			if(previousOp === null)
				return;
			flushOperation(parseInt(buffer));
			previousOp = null;
			buffer = "" + runningTotal;
			runningTotal = 0;
			break;
		case "←":
			if(buffer.length === 1)
				buffer = "0"
			else
				buffer = buffer.substring(0, buffer.length - 1);
			break;
	    case "+":
	    case "-":
	    case "×":
	    case "÷":
	      handleMath(value);
	      break;
	}
}

function handleMath(value){
	if(buffer === "0")
		return;

	const intBuffer = parseInt(buffer);
	if(runningTotal === 0)
		runningTotal = intBuffer;
	else
		flushOperation(intBuffer);

	previousOp = value;
	buffer = "0";
}

function flushOperation(intBuffer) {
	console.log(runningTotal)
	switch(previousOp) {
		case "+":
			runningTotal += intBuffer;
			break;
		case "-":
			runningTotal -= intBuffer;
			break;
		case "×":
			runningTotal *= intBuffer;
			break;
		case "÷":
			runningTotal /= intBuffer;
			break;
	}
	console.log(runningTotal)
}

function rerender() {
	screen.innerText = buffer;
}