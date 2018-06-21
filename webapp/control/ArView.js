/*global THREE TWEEN*/
sap.ui.core.Control.extend("webar-test.control.ArView", {
	metadata: {
		properties: {
			"threeContext": "any"
		}
	},

	getScene: function() {
		return this.getThreeContext().scene;
	},

	getPosition: function() {
		return this.getThreeContext().camera.position;
	},

	getOrientation: function() {
		return this.getThreeContext().camera.quaternion;
	},

	onAfterRendering: function() {

		if (this.arViewInitialized) {
			return;
		}
		this.arViewInitialized = true;
 
		var that = this;
		var container;
		var renderer, camera, scene;
		THREE.WebXRUtils.getDisplays().then(init);

		function init(displays) {
			container = document.createElement('div');
			document.body.appendChild(container);

			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera();
			scene.add(camera);
			that.setThreeContext({
				scene: scene,
				camera: camera
			});
			renderer = new THREE.WebGLRenderer({
				alpha: true
			});
			renderer.autoClear = false;
			container.appendChild(renderer.domElement);
			
			var pointLight = new THREE.PointLight(0xffffff, 0.8);
			camera.add(pointLight);

			var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4);
			scene.add(ambientLight);

			window.addEventListener('resize', onWindowResize, false);
			onWindowResize();
			var options = {
				// Flag to start AR if is the unique display available.
				AR_AUTOSTART: true
			}
			renderer.xr = new THREE.WebXRManager(options, displays, renderer, camera, scene, update);
		}

		function onWindowResize() {
			setTimeout(() => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
			}, 150);
		}
		// Called once per frame, before render, to give the app a chance to update this.scene
		function update(frame) {
			TWEEN.update();
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