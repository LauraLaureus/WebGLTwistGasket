function changedRotation(degrees){

	
	document.getElementById('rotation').value = degrees;

}

function degreesToRadians(degrees){
	return (degrees * (Math.PI/180));
}

function changedDivisionLevel(nLevel){

	document.getElementById('levels').value = nLevel;

}

function updateAll(){

	changedRotation(document.getElementById('degree-slider').value);
	changedDivisionLevel(document.getElementById('subdivision-levels').value)
	
}
