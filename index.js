// import main
import Main from './main.js';


// variables for the window
const drawing_window = document.getElementById('drawing_window');
const ctx = drawing_window.getContext("2d");


// import the junction file (where everything meets)
const main = new Main(drawing_window);

// initialized many helper functions on startup
main.initialize(ctx);

// where most of the logic code is located
main.update(ctx);

// updates the canvas screen whenever the user moves about the screen
drawing_window.addEventListener('mousemove', () => {
  if (main.camera.status === 1) main.draw(ctx);
});

drawing_window.addEventListener('wheel', () => {
  if (main.camera.status === 2) main.draw(ctx);
});