# Why Three.js?

Three.js allows for the creation of complex 3D computer animations with relatively little effort due to its use of WebGL.
For instance, the perspective camera, a great feature in our 3D grapher, is normally quite complicated to implement but comes
for free with Three.js.

# Why Flask?

Beyond our familiarity with Flask by this point, Flask was the web framework of choice because it offers more simplicity for
relatively small applications such as our project.

# Why math.js?

When the user inputs a function, the string must be parsed into meaningful functions, operations, and values before it makes any
sense to the computer. Manually creating a parser would be complicated, so we borrowed this library's parser to save us a lot
of trouble.

# Why did we draw our functions with point clouds?

A surface can be thought of as infinitely many (or at least a whole lot of) points evaluated at their respective x, y values.
If we instead choose to plot just a few hundred or thousand points, not much is lost (other than time needed to render the
graph). The application still clearly defines the shape of the graph of the user inputted function, which is the goal
of any graphing application.

# Why dat.GUI?

Many variables need to be changed in our 3D grapher, such as literal function variables, functions, ranges, divisions,
color, etc. dat.GUI allows the user to modify such variables during execution, which makes a lot of sense in this application.