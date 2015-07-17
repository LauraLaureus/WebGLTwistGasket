"user strict";

var gl;
var points = [];
var canvas;
var NumTimesToSubdivide =0;
var angle = 0;
var thetaLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    //var vertices = [vec2(-1, -1),vec2(0, 1),vec2( 1, -1)];

    //divideTriangle (vertices[0],vertices[1],vertices[2],NumTimesToSubdivide);
    computeTesellation();
    computeRotation();


    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    render();
};

function triangle( a, b, c )
{
    points.push( a, b, c );
}

function divideTriangle( a, b, c, count )
{

    // check for end of recursion

    if ( count === 0 ) {
        triangle( a, b, c );
    }
    else {

        //bisect the sides

        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        // three new triangles

        divideTriangle( a, ab, ac, count );
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
    }
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}

function update(){

	//UpdateUI
	updateAll();

	//variables get the values they have before the first rendering.
	toDefaultValues();

	//compute transformations
	window.onload(); //teselation
	//computeRotation();
	//computeTesellation();
    //computeRotation();

	//finally render
	//render();
}

function toDefaultValues(){

	points = [];
	NumTimesToSubdivide = parseInt(document.getElementById('subdivision-levels').value);
	angle = parseFloat(document.getElementById('degree-slider').value);
}

function computeRotation(){

	var x,y = 0;
	var sin, cos;
	var rad = degreesToRadians(angle);

	for (var i = 0; i < points.length; i++){
		x = points[i][0];
		y = points[i][1];

		d = rad*Math.sqrt(x*x+y*y);
		sin = Math.sin(d);
		cos = Math.cos(d);
		

		points[i][0] = -sin*y + cos * x;
		points[i][1] = sin*x + cos*y;

	}
}

function computeTesellation(){

	var vertices = [vec2(-1, -1),vec2(0, 1),vec2( 1, -1)];
    divideTriangle (vertices[0],vertices[1],vertices[2],NumTimesToSubdivide);

}