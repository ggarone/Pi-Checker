const pi = `14159265358979323846264338327950288419716939937510
			58209749445923078164062862089986280348253421170679
			82148086513282306647093844609550582231725359408128
			48111745028410270193852110555964462294895493038196
			44288109756659334461284756482337867831652712019091
			45648566923460348610454326648213393607260249141273
			72458700660631558817488152092096282925409171536436
			78925903600113305305488204665213841469519415116094
			33057270365759591953092186117381932611793105118548
			07446237996274956735188575272489122793818301194912
			98336733624406566430860213949463952247371907021798
			60943702770539217176293176752384674818467669405132
			00056812714526356082778577134275778960917363717872
			14684409012249534301465495853710507922796892589235
			42019956112129021960864034418159813629774771309960
			51870721134999999837297804995105973173281609631859
			50244594553469083026425223082533446850352619311881
			71010003137838752886587533208381420617177669147303
			59825349042875546873115956286388235378759375195778
			18577805321712268066130019278766111959092164201989`;

const input = document.querySelector("input");
const piResult = document.querySelector("#piResult");
const digits = document.querySelector("h3");
const displayResult = document.querySelector(".d-none");
const maxNumberOfDigits = Math.round(input.clientWidth / 44.60);
let value = 0;
let count = 0;
let correctDigits = 0;

//don't allow any keys that are not numbers or backspace
input.addEventListener('keydown', function(e) {
	if (48 <= e.which && e.which <= 57 || 96 <= e.which && e.which <= 105 || e.which === 8) {
	} else {
		e.preventDefault();
	}
	if (value.length >= maxNumberOfDigits){
		if(e.which !== 8)
			e.preventDefault();
	}
});

input.addEventListener('input', (key) => {
	const data = key.data;
	const inputType = key.inputType;
	let oldText = piResult.innerHTML;
	value = input.value;
	console.log(value);

	//if input is empty set piRusult to the start
	if(checkIfEmpty(value))
		return;

	//if backspace is pressed
	if(checkBackspace(oldText,inputType))
		return;

	displayResult.classList.remove("d-none");
	updateDigits(oldText,data);

});

function checkIfEmpty(value) {
	if(!value && count != 0){
		piResult.textContent = '';
		count = 0;
		correctDigits = 0;
		digits.innerHTML = `Correct digits: <span>${correctDigits}</span>`;
		displayResult.classList.add("d-none");
		return true;
	}
}

function checkBackspace(oldText,inputType) {
	if(inputType == "deleteContentBackward"){
		let result = '';
		count--;
		temp = oldText.split('<span ');
		for(let i=0; i<temp.length-1;i++)
			result += `<span ${temp[i]}`;
		piResult.innerHTML = result;
		if(temp[temp.length-1].includes("correct"))
			correctDigits--;
		digits.innerHTML = `Correct digits: <span>${correctDigits}</span>/<span>${count}</span>`;
		return true;
	}	
}

function updateDigits(oldText,data) {
	if(data === pi[count]){
		piResult.innerHTML =  oldText + `<span class="correct">${pi[count]}</span>`;
		correctDigits++;
	} else {
		piResult.innerHTML =  oldText + `<span class="wrong">${pi[count]}</span>`;
	}
	count++;
	digits.innerHTML = `Correct digits: <span>${correctDigits}</span>/<span>${count}</span>`;
}
