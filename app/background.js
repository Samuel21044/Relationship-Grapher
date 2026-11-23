export function resizeCanvasDimensions(screen, screenDimensions) {
  screen.width = window.innerWidth;
  screen.height = window.innerHeight;

  screenDimensions.w = window.innerWidth;
  screenDimensions.h = window.innerHeight;
}

export function drawGuideArrows(ctx, screen, arrow, camera) {
  if (arrow.type === 'None') return;

  ctx.strokeStyle = `rgb(${arrow.color}, ${arrow.color}, ${arrow.color})`;

  // helper variables
  const scale = camera.scale;
  const spacing = (v) => arrow.spacing[v] * scale;
  const halfSize = arrow.size * scale / 2;

  // dont ask me how this math/code works, I dont really know, I asked AI for help :(
  const origin = (v, s) => screen[s] / 2 * scale - camera[v];
  const start = (v, s) => ((origin(v, s) % spacing(v)) + spacing(v)) % spacing(v) - spacing(v);

  
  // draw the cross arrows as a grid
  
    for (let x = start('x', 'w'); x < screen.w + halfSize; x += spacing('x')) {
      for (let y = start('y', 'h'); y < screen.h + halfSize; y += spacing('y')) {
        ctx.beginPath();
        guideArrowStyle(ctx, arrow.type, x, y, halfSize);
        ctx.stroke();
      }
    }
  //arrow.type === 'Crossarrow' ? ctx.stroke() : ctx.fill();
  //ctx.fill();
  
}

function guideArrowStyle(ctx, type, x, y, size) {
  switch(type) {
    case 'Crossarrow':
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y);

        ctx.moveTo(x, y - size);
        ctx.lineTo(x, y + size);
      break;
    case 'Dot':
        ctx.arc(x, y, size, 0, 2 * Math.PI);
      break;
  }
}