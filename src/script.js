import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Color, DoubleSide } from 'three'
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
        this.InitFog()
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
        this.renderer.setClearColor(0xffffff)
    }

    InitFog(){
        this.fog = new THREE.Fog(0xffffdd, 20, 70)
        this.scene.fog = this.fog
    }

    InitCamera(){
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 100)
        this.camera.position.set(0, 10, 28)
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
                const q1 = gltf.scene.children.find((child) => { return child.name === 'q1'})
                const q2 = gltf.scene.children.find((child) => { return child.name === 'q2'})
                const q3 = gltf.scene.children.find((child) => { return child.name === 'q3'})
                const q4 = gltf.scene.children.find((child) => { return child.name === 'q4'})

                const q1001 = gltf.scene.children.find((child) => { return child.name === 'q1001'})
                const q2001 = gltf.scene.children.find((child) => { return child.name === 'q2001'})
                const q3001 = gltf.scene.children.find((child) => { return child.name === 'q3001'})
                const q4001 = gltf.scene.children.find((child) => { return child.name === 'q4001'})

                const q1002 = gltf.scene.children.find((child) => { return child.name === 'q1002'})
                const q2002 = gltf.scene.children.find((child) => { return child.name === 'q2002'})
                const q3002 = gltf.scene.children.find((child) => { return child.name === 'q3002'})
                const q4002 = gltf.scene.children.find((child) => { return child.name === 'q4002'})

                const q1003 = gltf.scene.children.find((child) => { return child.name === 'q1003'})
                const q2003 = gltf.scene.children.find((child) => { return child.name === 'q2003'})
                const q3003 = gltf.scene.children.find((child) => { return child.name === 'q3003'})
                const q4003 = gltf.scene.children.find((child) => { return child.name === 'q4003'})
                
                
                gltf.scene.traverse((child) => {
                    child.material = this.bakedMaterial
                    // child.material = new THREE.MeshBasicMaterial({ map:this.bakedTexture })
                    q1001.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q2001.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q3001.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q4001.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})

                    q1002.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q2002.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q3002.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q4002.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})

                    q1003.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q2003.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q3003.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q4003.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})

                    q1.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q2.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q3.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    q4.material = new THREE.MeshBasicMaterial({color: 0xeeaf36})
                    console.log(child)
                })
                this.scene.add(gltf.scene)
                
            }
        )
    }

    InitLights(){
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        this.scene.add(this.ambientLight)

        // this.pointLight = new THREE.PointLight(0xffffff, 0.9)
        // this.scene.add(this.pointLight)
        // this.pointLight.position.set(0, 20, 0)
        // this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, 0.2, 0xffffff)
        // //this.scene.add(this.pointLightHelper)
    }

    InitControls(){
        this.controls = new OrbitControls(this.camera, canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
        this.controls.enableZoom = false
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
