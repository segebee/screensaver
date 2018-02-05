ScreenSaver JS
=========================

This is a project that mimics the blue screen no signal screensaver a TV showns when idle for a while... can be used as a screensaver when website is idle


## How to Use

Insert the relevant screensaver.css and screensaver.js files into the document you want the screensaver to be active on.

Initialize by running the function below after the screensaver.js is inserted into the DOM 

screenSaverInit();

The function can take in the following options as a json object, where no option is specified, the default below is used


{
    containerName : '.container', //the container where the screensaver will be embedded into, usually a div child of the body element
    elementName : '.screensaver', //name of the screensaver element
    interval : 1000, //speed at which the screensaver animation is run in milliseconds
    idleLimit : 5000, //user idle time to wait before activating screensaver
    idleCount  : 0, //idleTime start count
    velocity : 10, //speed at which screensaver child object moves
    x : 0, // x position of screensaver child object
    y : 0 // y position of screensaver child object
}