"use strict";

var gl;
var points;

window.onload = function init(){

	//Setup canvas where application will render
	var canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);

	//Placing the triangle vertices
	var vertices = new Float32Array([-1,1,0,1,1,-1]);

	//Configure WebGL
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(1.0,1.0,1.0,1.0);

	//Load shaders and initialize attribute buffers.
	var program = initShaders(gl,"vertex-shader","fragment-shader");
	gl.useProgram(program);

	//Load data into GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

	//Associate out shader variables with our data buffer
	var vPosition = gl.getAttrbLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vPosition);

	render();
}

function render(){

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.triangle,0,3);
}