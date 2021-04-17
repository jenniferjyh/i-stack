<script src='vendor/three.js/build/three.min.js'></script>
<script src='vendor/three.js/examples/js/controls/FirstPersonControls.js'></script>
<script src='../threex.proceduralcity.js'></script>
<script>
window.addEventListener('load', function() {
  var screen_canvas = document.getElementById('canvas5');
  var renderer1 = new Pre3d.Renderer(screen_canvas);

	var updateFcts	= [];
	var scene	= new THREE.Scene();
	scene.fog	= new THREE.FogExp2(0xd0e0f0, 0.0025 );

	var renderer	= new THREE.WebGLRenderer( { antialias: false } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	var camera		= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 3000)
	camera.position.y	= 80

	//////////////////////////////////////////////////////////////////////////////////
	//		add an object and make it move					//
	//////////////////////////////////////////////////////////////////////////////////
	var light	= new THREE.HemisphereLight( 0xffffff, 0x001e47, 1 );
	light.position.set( 0.75, 1, 0.25 );
	scene.add( light );

	var material	= new THREE.MeshBasicMaterial({ color: 0x101018 })
	var geometry	= new THREE.PlaneGeometry( 2000, 2000 )
	var plane	= new THREE.Mesh( geometry, material );
	plane.rotation.x= - 90 * Math.PI / 180;
	scene.add( plane );

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	var city	= new THREEx.ProceduralCity()
	scene.add(city)


	//////////////////////////////////////////////////////////////////////////////////
	//		Camera Controls							//
	//////////////////////////////////////////////////////////////////////////////////
	var controls	= new THREE.FirstPersonControls( camera );
	controls.movementSpeed	= 30;
	controls.lookSpeed	= 0.02;
	controls.lookVertical	= false;
	updateFcts.push(function(delta, now){
		controls.update( delta );
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	updateFcts.push(function(){
		renderer.render( scene, camera );
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		loop runner							//
	//////////////////////////////////////////////////////////////////////////////////
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		updateFcts.forEach(function(updateFn){
			updateFn(deltaMsec/1000, nowMsec/1000)
		})
	})


	function onMouseMove(event) {

	    // Update the mouse variable
	    event.preventDefault();
	    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	    // Make the sphere follow the mouse
	    mouseMesh.position.set(event.clientX, event.clientY, 0);
	};

</script>
