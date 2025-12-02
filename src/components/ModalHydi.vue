<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const props = defineProps({
    image: String,
    title: String,
    price: String,
    paragraph: String,
    show3dModel: Boolean,
    size: String,
    size2: String,
    size3: String,
    size4: String,
    size5: String
})

const emit = defineEmits(['closeModal', 'switchTo3D', 'switchTo2D'])

const modelContainer = ref(null)
let scene = null, camera = null, renderer = null, obj = null
let isAnimating = false

function handleOverlayClick(e) {
    if (e.target === e.currentTarget) emit('closeModal')
}

// ======================
//  ИНИЦИАЛИЗАЦИЯ 3D
// ======================
async function init3DModel() {
    console.log('🔄 Начало инициализации 3D модели...')
    
    await nextTick()

    if (!modelContainer.value) {
        console.error('❌ Контейнер для 3D модели не найден')
        return
    }

    // Очищаем контейнер
    modelContainer.value.innerHTML = ''

    const width = modelContainer.value.clientWidth
    const height = modelContainer.value.clientHeight

    console.log(`📐 Размеры контейнера: ${width}x${height}`)

    // Создаём renderer с явными настройками
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true
    })
    
    renderer.setSize(width, height, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // Прозрачный фон
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    
    modelContainer.value.appendChild(renderer.domElement)

    // Сцена
    scene = new THREE.Scene()
    
    // Камера
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5)

    // Освещение - более яркое
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(10, 10, 10)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(-10, 10, 10)
    scene.add(pointLight)

    // ДОБАВИМ ТЕСТОВЫЙ КУБ ДЛЯ ПРОВЕРКИ
    const testGeometry = new THREE.BoxGeometry(1, 1, 1)
    const testMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000,
        metalness: 0.3,
        roughness: 0.4
    })
    const testCube = new THREE.Mesh(testGeometry, testMaterial)
    testCube.position.set(0, 0, 0)
    scene.add(testCube)

    console.log('🧊 Тестовый куб добавлен')

    // Загрузка модели
    const loader = new GLTFLoader()
    
    console.log('📦 Начинаем загрузку модели...')
    
    loader.load("/3dModel/3dModelTshirt/scene.gltf", (gltf) => {
            console.log('✅ Модель успешно загружена:', gltf)
            
            // Удаляем тестовый куб
            scene.remove(testCube)
            
            obj = gltf.scene
            
            // Автоматическое масштабирование и центрирование
            const box = new THREE.Box3().setFromObject(obj)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())
            
            console.log(`📏 Размеры модели:`, size)
            console.log(`🎯 Центр модели:`, center)
            
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = maxDim > 0 ? 2 / maxDim : 1
            
            obj.scale.setScalar(scale)
            obj.position.sub(center.multiplyScalar(scale))
            
            scene.add(obj)
            
            // Настраиваем камеру
            const fov = camera.fov * (Math.PI / 180)
            const distance = maxDim > 0 ? (maxDim * scale) / (2 * Math.tan(fov / 2)) : 5
            camera.position.z = distance * 1.5
            
            camera.lookAt(0, 0, 0)

            console.log('🎯 Модель добавлена в сцену, запускаем анимацию...')

            // Сразу делаем видимым
            modelContainer.value.classList.add("fade-in")

            // Запускаем анимацию
            if (!isAnimating) {
                isAnimating = true
                animate()
            }
        },
        (progress) => {
            const percent = progress.lengthComputable 
                ? (progress.loaded / progress.total * 100).toFixed(2)
                : '0'
            console.log(`📊 Прогресс загрузки: ${percent}%`)
        },
        (err) => {
            console.error("❌ Ошибка загрузки GLTF:", err)
            // Оставляем тестовый куб если модель не загрузилась
        }
    )
}

// ======================
//  АНИМАЦИЯ
// ======================
function animate() {
    if (!renderer || !scene || !camera) {
        isAnimating = false
        return
    }
    
    requestAnimationFrame(animate)

    if (obj) {
        obj.rotation.y += 0.01
    }

    renderer.render(scene, camera)
}

// ======================
//  ОЧИСТКА 3D
// ======================
function cleanup3D() {
    console.log('🧹 Очистка 3D сцены...')
    
    isAnimating = false
    
    try {
        if (renderer) {
            renderer.dispose()
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement)
            }
        }
    } catch (error) {
        console.warn('⚠️ Ошибка при очистке renderer:', error)
    }
    
    scene = null
    camera = null
    renderer = null
    obj = null
}

// ======================
//  WATCH
// ======================
watch(() => props.show3dModel, async (is3d) => {
    console.log(`🔄 show3dModel изменилось: ${is3d}`)
    
    if (is3d) {
        // Даем время на отрисовку DOM
        setTimeout(() => {
            init3DModel()
        }, 50)
    } else {
        cleanup3D()
    }
})

onUnmounted(() => {
    console.log('🔴 Компонент размонтирован, очищаем 3D')
    cleanup3D()
})
</script>

<template>
    <div class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-window">
            
            <!-- 2D изображение -->
            <img v-if="!show3dModel" class="modal-img" :src="image" alt="">

            <!-- 3D модель -->
            <div 
                v-else 
                ref="modelContainer" 
                class="modal-3dmodel"
            >
                <div class="loading-text">Загрузка 3D модели...</div>
            </div>

            <!-- Информация -->
            <div class="modal-info">
                <h3 class="modal-title">{{ title }}</h3>
                <p class="modal-description">{{ paragraph }}</p>
                <p class="modal-price">{{ price }}</p>
                <div class="modal__size">
                    <p>Размер: </p>
                    <button class="size__btn modal__size--l">{{ size }}</button>
                    <button class="size__btn modal__size--m">{{ size2 }}</button>
                    <button class="size__btn modal__size--s">{{ size3 }}</button>
                    <button class="size__btn modal__size--xl">{{ size4 }}</button>
                    <button class="size__btn modal__size--xxl">{{ size5 }}</button>
                </div>

                <button 
                    v-if="!show3dModel" 
                    class="view-3d-btn" 
                    @click.stop="$emit('switchTo3D')"
                >
                    Посмотреть в 3D
                </button>

                <button 
                    v-else 
                    class="view-2d-btn" 
                    @click.stop="$emit('switchTo2D')"
                >
                    Посмотреть фото
                </button>

                <button class="close-btn" @click.stop="$emit('closeModal')">×</button>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.modal-window {
    display: flex;
    background: white;
    width: 90%;
    max-width: 800px;
    height: 500px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
}

.modal-img {
    width: 400px;
    height: 100%;
    object-fit: cover;
}

.modal-3dmodel {
    width: 400px;
    height: 100%;
    background: #2c3e50; // Темный фон для контраста
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    
    canvas {
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        position: absolute;
        top: 0;
        left: 0;
    }
}

.modal-3dmodel.fade-in .loading-text {
    display: none;
}

.loading-text {
    color: white;
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.modal-info {
    padding: 30px;
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.modal-title {
    margin: 0;
    font-size: 1.5em;
    color: #333;
}

.modal-description {
    color: #666;
    line-height: 1.5;
    margin: 0;
}

.modal-price {
    font-weight: bold;
    font-size: 1.4em;
    color: #000;
    margin: 10px 0;
}

.view-3d-btn,
.view-2d-btn {
    padding: 12px 24px;
    background: black;
    color: white;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    margin-top: auto;
    transition: background 0.3s ease;

    &:hover {
        background: rgb(48, 47, 47);
    }
}

.view-2d-btn {
    background: #555;
    
    &:hover {
        background: #333;
    }
}

.close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    // background: #ff4444;
    color: black;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 1.2em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: white;
    }
}

.modal__size {
    display: flex;
    color: black;
    gap: 20px;

    button {
        border: 1px solid black;
        padding: 0px 10px;
        cursor: pointer;
        
        &:hover {
            background: black;
            color: white;
        }
        
        &.active {
            background: black !important;
            color: white !important;
            border: 2px solid #ff0000;
        }
    }
}

</style>