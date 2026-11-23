// imports
import { resizeCanvasDimensions, drawGuideArrows } from './app/background.js';
import { calculateWorldCoordinateOffset, calculateZoom } from './app/movement.js';
import Vertex from './app/vertex.js';
import Edge from './app/edge.js';
import GraphSettings from './app/menu.js';


export default class Main {
  constructor (drawing_window) {
    // initializing variables
    this.drawingWindow = drawing_window;

    // the viewport's width and height
    this.screen = {w: 0, h: 0};

    this.backgroundColor = 224;

    this.guideArrowParams = {spacing: {x: 100, y: 100}, size: 20, color: 150, type: 'Dot'};

    
    // the local coordinate system
    this.camera = {x: 0, y: 0, scale: 1, status: 0};// status: { 0 - not moving, 1 - dragging, 2 - scrolling, 3 - animating }

    this.zoom = {min: 0.25, max: 3, scalingFactor: 2500}; // will change later


    // write something here
    //this.graphData = {}; //<-- the actual stored graph data that gets loaded on startup
    //this.graph; //<-- the actual place where all of the edges and nodes are stored
    /*
    this.graph = {
      vertex: [
        [x, y, n]
      ],
      edge: {

      },
    };*/
    /*
    vertex
      - positionx
      - positony
      - name
      - anything else if neccesary
    
    edge
      -positionx
      -positiony
      - relationship type
      - status type
      - any other data

    */
   // the container in which the entire graph is stored in
   //this.graphContainer = document.getElementById('container');

    // create new instances of the graph elements
    //this.verticies = new Vertex(this.drawingWindow);
    //this.edges = new Edge();


    // initialie the configuration menu
    GraphSettings(this);

    // all the menu settings
    this.menu = {
      graphSettings: {
        guideArrowStyles: ['Crossarrow, Dot, None'],
        snapGrid: false,
      },
    };

    // disable key inputs whenever the user is using the config menu
    this.isUsingUGI = false;
  }

  /*addGraphElement(type) {
    switch (type) {
      case 'vertex':
          this.verticies.add();
        break;
      case 'edge':
          this.edges.add();
        break;
    }
  }*/

  initialize(ctx) {
    resizeCanvasDimensions(this.drawingWindow, this.screen);

    this.draw(ctx, true);
  }

  update(ctx) {
    // update the screen dimensions as needed
    window.addEventListener('resize', () => {
      resizeCanvasDimensions(this.drawingWindow, this.screen);

      this.draw(ctx, true);
    });

    // calculate the coordinates of where and what the user is currently seeing
    calculateWorldCoordinateOffset(this.camera);

    // calculates how zoomed in the user is
    calculateZoom(this.zoom, this.camera);
  }

  draw(ctx, init) {
    // update the drawing canvas whenever the user moves about the screen
    if (!(this.camera.status !== 0 || init)) return;
    
    // draw the background
    ctx.resetTransform();

    ctx.clearRect(0, 0, this.screen.w, this.screen.h);

    ctx.fillStyle = `rgb(${this.backgroundColor}, ${this.backgroundColor}, ${this.backgroundColor})`;
    ctx.fillRect(0, 0, this.screen.w, this.screen.h);

    // draw cross-arrowed background
    drawGuideArrows(ctx, this.screen, this.guideArrowParams, this.camera);

    // apply the camera transformations ("infinite canvas")
    ctx.setTransform(this.camera.scale, 0, 0, this.camera.scale, -this.camera.x, -this.camera.y);
    //this.graphContainer.style.transform = `translate(${-this.camera.x}px, ${-this.camera.y}px)`;


    // draw all the graph elements
    //ctx.fillStyle = 'blue';
    //ctx.fillRect(100, 100, 100, 100);


    // remembers to stop drawing once the user is done scrolling as it doesnt do so manually unlike dragging
    if (this.camera.status === 2) this.camera.status = 0;
  }
}


/*
Note that all of these transformations dont apply to the containers, so I need to manually do that too.

So things that need to be scaled. -->

 - Grid background
 - People size
*/