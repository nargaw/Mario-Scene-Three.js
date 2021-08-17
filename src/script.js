import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DoubleSide } from 'three'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
const canvas = document.querySelector('.webgl')

class MarioScene{
    constructor(){
        this._Init()
    }
    
    _Init(){
        this.scene = new THREE.Scene()
        // const box = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial()
        // )
        //this.scene.add(box)
        this.InitLoad()
        this.InitCamera()
        this.InitLights()
        this.InitRenderer()
        this.InitControls()
        this.Update()
        window.addEventListener('resize', () => {
            this.Resize()
        })
    }
    InitRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        })
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.render(this.scene, this.camera)
        this.renderer.outputEncoding = THREE.sRGBEncoding
    }

    InitCamera(){
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 100)
        this.camera.position.set(0, 4, 20)
        this.scene.add(this.camera)
    }

    InitLoad(){
        this.textureLoader = new THREE.TextureLoader()
        this.bakedTexture = this.textureLoader.load('./mario/baked.jpg')
        this.bakedTexture.flipY = false
        this.bakedTexture.encoding = THREE.sRGBEncoding
        this.bakedMaterial = new THREE.MeshBasicMaterial({ map:this.bakedTexture })
        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.load(
            './mario/mario.glb',
            (gltf) => {
                const q1 = gltf.scene.children.find((child) => { return child.name === ''})
                gltf.scene.traverse((child) => {
                    child.material = this.bakedMaterial
                    console.log(child)
                })
                this.scene.add(gltf.scene)
            }
        )
    }

    InitLights(){
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        this.scene.add(this.ambientLight)

        this.pointLight = new THREE.PointLight(0xffffff, 0.9)
        this.scene.add(this.pointLight)
        this.pointLight.position.set(0, 20, 0)
        this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, 0.2, 0xffffff)
        this.scene.add(this.pointLightHelper)
    }

    InitControls(){
        this.controls = new OrbitControls(this.camera, canvas)
        this.controls.enableDamping = true
        this.controls.update()
    }

    Resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    Update(){
        requestAnimationFrame(() => {     
            this.renderer.render(this.scene, this.camera)
            this.controls.update()
            this.Update()
        })  
    }
}

let _APP = null

window.addEventListener('DOMContentLoaded', () => {
    _APP = new MarioScene()
})