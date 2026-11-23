export function calculateWorldCoordinateOffset(camera) {
  // calculate the the offset from the world coordinates to what the user is seeing

  let startingDragPos = {x: 0, y: 0};
  let lastKnownDragPos = {x: 0, y: 0};

  drawing_window.addEventListener('mousedown', (e) => { 
    if (e.button !== 0) return; // only register on left-click

    startingDragPos = {x: e.clientX, y: e.clientY};
    lastKnownDragPos = {x: camera.x, y: camera.y};
    camera.status = 1;
  });

  drawing_window.addEventListener('mouseup', () => { camera.status = 0; });

  drawing_window.addEventListener('mousemove', (e) => {
    if (camera.status === 1) {
      // we calculate how far the user has dragged by subtracting how far the user has moved dragging from the place they started dragging and add that to the current local coord values
      camera.x = lastKnownDragPos.x - e.clientX + startingDragPos.x;
      camera.y = lastKnownDragPos.y - e.clientY + startingDragPos.y;
    }
  });
}

export function calculateZoom(zoom, camera) {
  // calculate scaling offset
  drawing_window.addEventListener('wheel', (e) => {

    //world position underneath the mouse before zooming
    const worldX = (e.clientX + camera.x) / camera.scale;
    const worldY = (e.clientY + camera.y) / camera.scale;

    camera.scale -= e.deltaY / zoom.scalingFactor;

    // add constraints
    if (camera.scale < zoom.min) camera.scale = zoom.min;
    if (camera.scale > zoom.max) camera.scale = zoom.max;


    // move camera so the same world point stays under the mouse
    camera.x = worldX * camera.scale - e.clientX;
    camera.y = worldY * camera.scale - e.clientY;
    
    camera.status = 2; // makes sure to update the canvas
  });
}

export function resetCamera(main) {
  // prevent the function from creating multiple instances of an animation
  if (main.camera.status === 3) return;

  // variables for the window
  const drawing_window = document.getElementById('drawing_window');
  const ctx = drawing_window.getContext("2d");

  // variables for the clock
  const fps = 60;
  let previousFrame = performance.now();

  // define camera
  const camera = main.camera;
  camera.status = 3;


  // move the camera back to (0, 0) via interpolation
  let time = 0;
  const resetSpeed = 0.06;

  const lerp = (start, end, t) => start + (end - start) * t;
  const shapingFunction = (t) => 1 - (1 - t) ** 3;

  const oldCamera = structuredClone(camera);


  // animation loop
  function animationLoop() {
    // clock
    const currentFrame = performance.now();
    const deltaTime = currentFrame - previousFrame;
    previousFrame = currentFrame;
    const deltaTiming = deltaTime * fps / 1000;

    // increment the time duration
    time += resetSpeed * deltaTiming;
    if (time >= 1) time = 1;

    // continue running the animation until the camera is reset | or until the user interacts with the canvas
    if (camera.x === 0 && camera.y === 0 && camera.scale === 1 || camera.status !== 3) {
      camera.status= 0;
      return;
    }

    // animate the camera moving back to (0, 0) via interp
    camera.x = lerp(oldCamera.x, 0, shapingFunction(time));
    camera.y = lerp(oldCamera.y, 0, shapingFunction(time));
    camera.scale = lerp(oldCamera.scale, 1, shapingFunction(time));

    main.draw(ctx);

    requestAnimationFrame(animationLoop);
  }

  // start the animation
  requestAnimationFrame(animationLoop);
}