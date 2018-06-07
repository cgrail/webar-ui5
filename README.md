# Augmented Reality in the Web with ArCore for Web and UI5

This repository contains the code of a sample project I've used at some conferences to demonstrate how to develop Augmented Reality apps with ArCore for Web and UI5.

A runnable version can be found here: https://grails.de/webar-ui5/webapp/

# Requirements

To be able to run the web app you'll need to install the ARCore for Web Player on your iPhone or iPad.
https://developers.google.com/ar/develop/web/quickstart

On an iPhone or iPad this app requires ARKit which runs on devices with at least an A9 processor or later like the iPhone 6s and iOS 11.
https://developer.apple.com/documentation/arkit/verifying_device_support_and_user_permission

# Solution

The code in the master branch contains the initial version of the app. The full game is implemented in the solution branch.
https://github.com/cgrail/webar-ui5/compare/solution

# Implement

For the implementation I clone the master branch of this repository into the SAP Web IDE and add the missing pieces there:
https://github.com/cgrail/webar-ui5/compare/solution

# Technical Background

The app is using ARCore for Web from Google. ARCore might be incorporated into WebXR in the future. WebXR is a standard which is currently being developed and supported by Microsoft, Google and Mozilla.
https://immersive-web.github.io/webxr/
