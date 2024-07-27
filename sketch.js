const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

let gif; 
let div;
let frameIndex = 0;  //current frame of the gif
let frameDelay = 4;  //delay for frames
let frameCounter = 0;

function preload() {
  gif = loadImage("HumanGif.gif");  //load the GIF
}

function setup() {
  noCanvas();
  div = createDiv();  //holder of the ascii art
  gif.resize(200, 150);
}

function draw() {
  gif.loadPixels();
  let ascii = "";  //empty string for ascii art

  //walk through image pixels
  for (let j = 0; j < gif.height; j++) {
    for (let i = 0; i < gif.width; i++) {
      const p = (i + j * gif.width) * 4;
      
      const r = gif.pixels[p + 0];
      const g = gif.pixels[p + 1];
      const b = gif.pixels[p + 2];
      const avg = (r + g + b) / 3;  //average brightness

      const l = density.length;
      const index = floor(map(avg, 0, 255, l, 0));  //map brightness to density index
      const c = density.charAt(index); 

      if (c == " ")
        ascii += '&nbsp;';  //non-breaking space for blank spaces
      else
        ascii += c;  
    }
    ascii += '<br/>';  //a break line at the end of each row
  }
  div.html(ascii);

  // Update frameIndex for the next frame after frameDelay counts
  frameCounter++;
  if (frameCounter % frameDelay == 0) {
    frameIndex++;
    if (frameIndex >= gif.numFrames()) {
      frameIndex = 0;
    }
    gif.setFrame(frameIndex);
  }
}
