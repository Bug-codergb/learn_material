import * as THREE from "three"
const scene = new THREE.Scene()
//scene.background = new THREE.Color("rgb(94, 163, 239)")
//加载器
const loader = new THREE.TextureLoader();
loader.load("/2.avif",function (texture){
  scene.background = texture;
  renderer.render(scene,camera)
},
undefined, // 进度回调（可选）
function (error) {
  console.error("背景加载失败:", error);
  // 设置默认背景色作为后备
  scene.background = new THREE.Color("rgb(94, 163, 239)");
})

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.z = 3
camera.position.y = 2
camera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)


const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial()
)
scene.add(cube)





renderer.render(scene,camera)