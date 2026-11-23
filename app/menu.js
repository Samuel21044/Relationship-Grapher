// import dat.GUI from CSN
import * as dat from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.module.js';
import { resetCamera } from './movement.js';

// initialize gui
const gui = new dat.GUI();

// folders
const folder = {
  connector: gui.addFolder('Properties'),
  graphFunctions: gui.addFolder('Graph Functions'),
  graphSettings: gui.addFolder('Graph Settings'),
  nodeSettings: gui.addFolder('Node Settings'),
};

// configuration settings (using dat.GUI)
export default function GraphSettings(main) {
  // Have all the folders open by default
  Object.values(folder).forEach(folder => { folder.open(); });
  

  // allows the user to add a new element to the canvas (node or edge depending on what they click)
  const button = {
    addVertex: () => main.addGraphElement('vertex'),
    addEdge: () => main.addGraphElement('edge'),
    resetCamera: () => resetCamera(main),
  };

  // the functions that let the user add / remove, and modify the graph
  folder.graphFunctions.add(button, 'addVertex').name('Add a new Person');
  folder.graphFunctions.add(button, 'addEdge').name('Add a new Connection');
  folder.graphFunctions.add(button, 'resetCamera').name('Reset Camera');

  //folder.graphSettings.add(main.menu.graphSettings, 'guideArrowStyles').name('something here').onChange(() => {

  //});
  //folder.graphSettings.add(main.menu.graphSettings, 'snapGrid').name('Snap Grid');
  /*
  folder.connector.add(relationshipContext, 'value', Object.keys(main.menu.context)).name('Relationship Context').onChange(() => {
    console.log(relationshipContext.value);

    console.log(main.menu.context[relationshipContext.value]);
    GraphSettings(main);
  });
  folder.connector.add(main.currentEdgeAttributes, 'relationshipType', main.menu.context[relationshipContext.value]).name('Relationship Type: ');

  // write comment here pt.2
  //code here

  // comment here pt.3
  //folder.connector.add(main.currentEdgeAttributes, 'strength', 1, main.menu.maxStrengthValue).name('Strength Value');


  // update how each node will look like
  folder.nodeSettings.__controllers.forEach(controller => {
    controller.onchange(() => main.vertex.initialize());
  });

  // advanced settings
  /*
  folder.advancedSettings.add(placeHolderObj, 'modelSelection', main.advancedOptions).name('Advanced Options');
  folder.advancedSettings.add(placeHolderObj, 'invokeButton').name('Run Advanced Options -----------').onChange(() => {
    updateModelList(main);
  });
  
  folder.advancedSettings.add(placeHolderObj, 'githubLink').name('\u00A0'.repeat(7) + '--------- Github Repository 🌐 ---------');
  */


  // disable keys when changing number values
  document.querySelectorAll('.dg input').forEach(input => {
    input.addEventListener('focus', () => main.usingGUI = true);
    input.addEventListener('blur', ()  => main.usingGUI = false);
  });

  return gui;
}

/*
Add Node
Add Connection / Relationship
Reverse scrolling direction (maybe)

srolling down zooms out and scrolling in zooms in
*/


/*
Couple bugs-

I need to make the default width wider for the name of each controller to show up
*/

/*
I need to try and see what happens if I try and modify a boolean
I need to try and see what happens if I try and have an object instread of a list for the dropdown menu



All the different vlaues in the GUI


*/










/*
Relationship Properties

Add a new Person
Add a new Connection
Reset Zoom (also go to (0, 0))

Toggle guide arrows
Toggle snap


Dont forget to also have keyboard shortcuts of all of these

Add new Connection
*/