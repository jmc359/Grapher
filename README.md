# 3D Function Grapher in Three.js

Flask web app that allows the user to visualize inputted functions of up to 2 variables. Uses [Three.js](https://threejs.org/)
to create and display 3D graphics as well as [math.js](http://mathjs.org/) for its expression parser and built in
functions/constants.

Watch a demo [here](https://youtu.be/NSS_rw8p0TI)

## Getting Started

These steps will get you a copy of the project up and running on your local IDE for testing and development purposes.

1. Execute `git clone https://github.com/jmc359/Grapher.git` in your workspace to clone the repository
2. `npm install mathjs` to install math.js library
3. Drag math.js folder (node_modules/) into Grapher/static/js/src/
4. Go into Grapher/ directory and execute `flask run`
5. Open link outputted in terminal window

## Usage/Features

Now it's time to explore!

First, drag across the screen to alter the viewing perspective, zoom in/out by scrolling. Some standard perspectives can be found
under the Camera folder.

Next, graph the default function (or any of your choosing, as long as the function is in x and y). A full list of supported
functions can be found [here](http://mathjs.org/docs/reference/functions.html).

Feel free to change the range of x and y values, the number of divisons, or even the color of the graph.
The more divisions, the less grainy the graph will look. However, the amount of time to render the graph will increase.

Notice that multiple functions may be graphed simultaneously. A list of functions you've graphed will appear under the Functions
folder. Clicking the checkbox next to a function will toggle its visibility.

## Acknowledgements



