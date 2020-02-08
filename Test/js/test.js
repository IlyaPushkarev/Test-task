(function(){
	
let output1 = document.getElementById('quantity')
console.log(output1.value)

let quantity=output1.value;

output1.addEventListener("change", ()=>{
	console.log(output1.value)
	quantity = output1.value;

	create(output1.value)
})

create(output1.value);

function create(quantityValue){
	
var width = window.innerWidth;
var height = window.innerHeight;
var canvas = document.getElementById('canvas');
var gui = new dat.GUI();

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

const renderer = new THREE.WebGLRenderer({canvas});

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, width/height, near, far);
camera.position.set(0, 0, 6);

// camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const cube_width = 0.1;
const cube_height = 0.1;
const cube_depth = 0.1;
const geometry = new THREE.BoxBufferGeometry(cube_width, cube_height, cube_depth);


 const material = new THREE.MeshBasicMaterial( );


const cube = new THREE.Mesh(geometry, material);

const group = new THREE.Object3D();

// let quantity= 20;
let leftDirection=0;
let rightDirection=0;
let topDirection = 2;

for(let column = 0; column < quantity; column++){
	
	const cube = new THREE.Mesh(geometry, material);
	
		cube.position.x += rightDirection*geometry.parameters.width/2;
		
		rightDirection +=3;
		group.add(cube);
	
}

	let k =3;
	let shift = 1;
	let startForThisRow;
	let firstStep = geometry.parameters.width/4;
	let stepRight = geometry.parameters.width/4;

	for(let row = 1; row < quantity; row++){
		

		for(let column = 0; column < quantity-row; column++){
				
			const cube = new THREE.Mesh(geometry, material);
				
				if(column==0){
					cube.position.x = k*geometry.parameters.width/4;
					startForThisRow = k*geometry.parameters.width/4;
					stepRight = startForThisRow + 6*geometry.parameters.width/4;
				}else{
					cube.position.x = stepRight;
					stepRight +=6*geometry.parameters.width/4
				}
				
				cube.position.y = row*geometry.parameters.height;

			group.add(cube);
		}
		k+=3;			
	}
	
scene.add(group);

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}
	return needResize;
}

function render() {
	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

requestAnimationFrame(render);

class AxisGridHelper {
	constructor(node, units = 10) {
		const axes = new THREE.AxesHelper();
		axes.material.depthTest = false;
      axes.renderOrder = 2;  // after the grid
      node.add(axes);

      const grid = new THREE.GridHelper(units, units);
      grid.material.depthTest = false;
      grid.renderOrder = 1;
      node.add(grid);

      this.grid = grid;
      this.axes = axes;
      this.visible = true;
  }
  get visible() {
  	return this._visible;
  }
  set visible(v) {
  	this._visible = v;
  	this.grid.visible = v;
  	this.axes.visible = v;
  }
}

function makeAxisGrid(node, label, units) {
	const helper = new AxisGridHelper(node, units);
	gui.add(helper, 'visible').name(label);
}

makeAxisGrid(group, 'Cube', 10);

const controls = new THREE.OrbitControls(camera, canvas);
controls.target.set(0, 0, 1);
controls.update();

}



})()