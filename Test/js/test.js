let width = window.innerWidth;
let height = window.innerHeight;
let middlePositionX=0;

const canvas = document.getElementById('canvas');
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

const renderer = new THREE.WebGLRenderer({canvas});

let fov = 75;
 let aspect = width/height;  
let near = 1.5;
let far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect , near, far);

camera.position.set(-2, -2, 1);;

const controls = new THREE.OrbitControls(camera, canvas);
controls.target.set(0, 0, 5);
controls.update();

const scene = new THREE.Scene();

const group = new THREE.Object3D();

function render() {
		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);

function randomColor(){
	let colors = [0x808080,0x008000,0x00FF00,0x800000,0xFF0000,0x804000,0xFF8000,0x808000,0xFFFF00,0x000080,0x0000FF,0x800080,0xFF00FF,0x004080,0xF04080,0x0080FF,0x008080,0x00FFFF,0xD0D0D0];
	return colors[Math.floor(Math.random()*(colors.length))];
}

function createTriangle(amount, width=0.1, height=0.1, depth=0.1){
	const geometry = new THREE.BoxBufferGeometry(width, height, depth);
	
	let quantity = amount;
	let rightDirection=0;

	for(let column = 0; column < quantity; column++){

		const material = new THREE.MeshBasicMaterial({color: randomColor()});
		const cube = new THREE.Mesh(geometry, material);

		cube.position.x += rightDirection*geometry.parameters.width/2;

		rightDirection +=3;

		group.add(cube);
	}

	let k =3;
	let startForThisRow;
	let stepRight = geometry.parameters.width/4;

	for(let row = 1; row < quantity; row++){

		for(let column = 0; column < quantity-row; column++){

			const material = new THREE.MeshBasicMaterial({color: randomColor()});
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
	if(quantity==1){
	camera.position.set(0, 0, 2);
	controls.target.set(0, 0, 1 );
	controls.update();
	}else{
		middlePositionX = (quantity==1)? 0 : Math.ceil(quantity/2);
	camera.position.set(group.children[middlePositionX].position.x, (group.children[middlePositionX].position.y+1) * middlePositionX/4, 2);
	controls.target.set(group.children[middlePositionX].position.x, (group.children[middlePositionX].position.y+1) * middlePositionX/4, 0 );
	controls.update();
	}
	

	scene.add(group);

	function render() {
		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);
}

let number = document.getElementById('quantity');
let outputQuantity = document.getElementById('outputQuantity');

number.addEventListener("change", function(){
	outputQuantity.innerText = "Количество снизу=" +`${number.value}`;

	group.children.length=0;

	if(+number.value!==0){
		createTriangle(+number.value, +size.value, +size.value, +size.value);
	}
});

let size = document.getElementById('size');
let outputSize= document.getElementById('outputSize');

size.addEventListener("change", function () {
	outputSize.innerText = "Размер=" + `${(this.value*100).toFixed(0)}`
	
	let param = +this.value;

	group.children.length=0;

	if(+number.value!==0){
		createTriangle(+number.value, +size.value, +size.value, +size.value);
	}
})

