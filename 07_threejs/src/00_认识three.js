import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//创建场景
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
) 
//创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
//创建几何体
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:0xec4141})

//创建网格
const cube = new THREE.Mesh(geometry,material)
cube.position.x=2
//将网格添加到场景中
scene.add(cube)
//设置相机位置
camera.position.z = 5
camera.position.x = 1
camera.position.y = 1 
camera.lookAt(0,0,0) 

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true//阻尼惯性
//controls.autoRotate = true


function render(){
  controls.update()
  requestAnimationFrame(render)
  //cube.rotation.x+=0.01
  //cube.rotation.y+=0.01
  renderer.render(scene,camera)
}
render()