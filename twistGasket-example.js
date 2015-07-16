var gl;
var points;

window.onload = function init() {
	var canvas = document.getElementById('gl-canvas');
	gl = WebGLUtils.setupWebGL(canvas);
	if(!gl){
		alert("WebGL isn't available");
	}

	var vertices = [vec2(-0.5,-0.5), vec2(-0.5.0.5),vec2(0.5,0.5),vec2(0.5,0.5)];
	gl.viewpor(0,0,canvas.width, canvas.height);
	gl.clearColor(0.0,0.0,0.0,1.0);

	var program = initShaders(gl,"vertex-shader","fragment-shader");
	gl.useProgram(program);

	//Process in GPU -------------------------------------
	//Create a vertex Buffer Object on GPU
	var bufferID = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferID);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices),gl.STATIC_DRAW);

	//Flatten is a function defined in MV.js, it transforms JS array to float32 array

	//Assosiate shader variables with variables in JS
	var vPosition = gl.getAttribLocation(program,"vPosition");
	gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vPosition);
}