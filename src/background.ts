import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
const loader = new GLTFLoader()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50,(parseFloat(getComputedStyle(document.querySelector('#background') as HTMLCanvasElement).width)/parseFloat(getComputedStyle(document.querySelector('#background') as HTMLCanvasElement).height)), 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background') as HTMLCanvasElement
})
let childcount = 10
// renderer.setSize(window.innerWidth*0.4, window.innerHeight*0.4)
renderer.setSize(parseInt(getComputedStyle(document.querySelector('#background') as HTMLCanvasElement).width), parseInt(getComputedStyle(document.querySelector('#background') as HTMLCanvasElement).height))
let childArray: THREE.Object3D[] = []
// load every child in the gltf file and add it to the childArray
loader.load('public/scene.gltf', (gltf) => {
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.name.includes('_person')) {
      var newchild = new THREE.Mesh(child.geometry, new THREE.MeshMatcapMaterial())
      newchild.rotateX(-Math.PI / 2)
      newchild.rotateY(-0)
      childArray.push(newchild)
    }
  })
  scene.add(childArray[childcount])
})
// set the scene
// const gplane = new THREE.PlaneGeometry(100, 100)
// gplane.rotateX(-Math.PI / 2)
// const plane = new THREE.Mesh(gplane, new THREE.MeshBasicMaterial({ color: 0x000000 }))
// scene.add(plane)
camera.position.z = 2
camera.position.y = 0.6
camera.position.x = 0

// animate the scene
function animations() {
  requestAnimationFrame(animations)
  scene.background = new THREE.Color(getComputedStyle(document.body).backgroundColor)
  childArray[childcount].rotateZ(0.01)
  renderer.render(scene, camera)
}
animations()
