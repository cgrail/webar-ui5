/*global THREE TWEEN*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"webar-test/assets/ArAssets"
], function(Controller, MessageToast, ArAssets) {
	"use strict";

	return Controller.extend("webar-test.controller.Game", {
		onInit: function() {
			this.arView = this.byId("arView");
			this.assets = new ArAssets();
			this.assets.loadTieFigher(function(fighter) {
				this.fighter = fighter;
			}.bind(this));
		},

		shoot: function() {
			MessageToast.show("Please implement me...");
		},

		getPositionWithOffset: function(offset) {
			var dirMtx = new THREE.Matrix4();
			dirMtx.makeRotationFromQuaternion(this.arView.getOrientation());
			var push = new THREE.Vector3(0, 0, -1.0);
			push.transformDirection(dirMtx);
			var pos = this.arView.getPosition();
			pos.addScaledVector(push, offset);
			return pos;
		}

	});
});