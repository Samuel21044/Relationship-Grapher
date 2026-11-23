export default class Vertex {
  constructor(name, drawing_window) {
    this.name = name;

    this.relationShipType = '';
    this.strengthValue = 1;
    this.connectorProperties = {
      
    };


    this.vertexContainer = document.getElementById('container');

    this.divStyle = {
      border: {thickness: 5, roundedCorner: 8},
      spacing: {margin: [2, 0], padding: [10, 18]},
      font: {size: 30, family: 'Arial', weight: 500},
      maxWidth: 300,
    };

    this.drawing_window = drawing_window;
    
  }

  add() {
    const newPerson = document.createElement('div');
    newPerson.className = 'person';

    newPerson.style.transform = `translate(400px, 400px)`;

    this.vertexContainer.appendChild(newPerson);
  }

  update() {
    this.drawing_window.addEventListener('mousemove', () => {
      console.log('can detect moving!');
    });
  }
  delete() {

  }

  drag() {
    
  }
}