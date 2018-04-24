sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("webar-test.controller.Game", {
		onInit: function() {
			this.arView = this.byId("arView");
		},

		shoot: function() {
			MessageToast.show("Please implement me...");
		},

		getScene: function() {
			return this.arView.getThreeContext().scene;
		},

		getPosition: function() {
			var vrFrameData = this.arView.getThreeContext().vrFrameData;
			return new THREE.Vector3(
				vrFrameData.pose.position[0],
				vrFrameData.pose.position[1],
				vrFrameData.pose.position[2]
			);
		},

		getOrientation: function() {
			var vrFrameData = this.arView.getThreeContext().vrFrameData;
			return new THREE.Quaternion(
				vrFrameData.pose.orientation[0],
				vrFrameData.pose.orientation[1],
				vrFrameData.pose.orientation[2],
				vrFrameData.pose.orientation[3]
			);
		}
	});
});