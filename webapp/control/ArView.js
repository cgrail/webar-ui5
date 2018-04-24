sap.ui.core.Control.extend("webar-test.control.ArView", {
	metadata: {
		properties: {
			"threeContext": "any"
		}
	},

	onAfterRendering: function() {
		
		if (this.arViewInitialized) {
			return;
		}
		this.arViewInitialized = true; 

		var vrDisplay;
		var vrControls;
		var arView;
		var vrFrameData;

		var canvas;
		var camera;
		var scene;
		var renderer;
		
		var viewId = this.getId();
		var that = this;

		THREE.ARUtils.getARDisplay().then(function(display) {
			if (display) {
				vrFrameData = new VRFrameData();
				vrDisplay = display;
				init();
			} else {
				THREE.ARUtils.displayUnsupportedMessage();
			}
		});

		function init() {
			// Setup the three.js rendering environment
			renderer = new THREE.WebGLRenderer({
				alpha: true,
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.autoClear = false;
			canvas = renderer.domElement;
			document.body.appendChild(canvas);
			scene = new THREE.Scene();
			that.setThreeContext({
				scene: scene,
				vrFrameData: vrFrameData
			});

			// Creating the ARView, which is the object that handles
			// the rendering of the camera stream behind the three.js
			// scene
			arView = new THREE.ARView(vrDisplay, renderer);

			// The ARPerspectiveCamera is very similar to THREE.PerspectiveCamera,
			// except when using an AR-capable browser, the camera uses
			// the projection matrix provided from the device, so that the
			// perspective camera's depth planes and field of view matches
			// the physical camera on the device.
			camera = new THREE.ARPerspectiveCamera(
				vrDisplay,
				60,
				window.innerWidth / window.innerHeight,
				vrDisplay.depthNear,
				vrDisplay.depthFar
			);
			var pointLight = new THREE.PointLight(0xffffff, 0.8);
			camera.add(pointLight);

			var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4);
			scene.add(ambientLight);

			// VRControls is a utility from three.js that applies the device's
			// orientation/position to the perspective camera, keeping our
			// real world and virtual world in sync.
			vrControls = new THREE.VRControls(camera);

			canvas.addEventListener(
				'touchstart',
				function() {
					console.log("onclick");
				}, false );

			// Kick off the render loop!
			update();
		}

		/**
		 * The render loop, called once per frame. Handles updating
		 * our scene and rendering.
		 */
		function update() {
			// Clears color from the frame before rendering the camera (arView) or scene.
			renderer.clearColor();

			// Render the device's camera stream on screen first of all.
			// It allows to get the right pose synchronized with the right frame.
			arView.render();

			// Update our camera projection matrix in the event that
			// the near or far planes have updated
			camera.updateProjectionMatrix();

			// From the WebVR API, populate `vrFrameData` with
			// updated information for the frame
			vrDisplay.getFrameData(vrFrameData);

			// Update our perspective camera's positioning
			vrControls.update();

			// Render our three.js virtual scene
			renderer.clearDepth();
			renderer.render(scene, camera);

			TWEEN.update();

			// Kick off the requestAnimationFrame to call this function
			// when a new VRDisplay frame is rendered
			vrDisplay.requestAnimationFrame(update);

		}

	},

	renderer: function(oRm, oControl) { // the part creating the HTML
		oRm.write("<div");
		oRm.writeControlData(oControl);
		oRm.addClass("ar-view");
		oRm.writeClasses();
		oRm.write('>');
		oRm.write("</div>");
	}
});