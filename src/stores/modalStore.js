import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cards, cards2, cards3 } from '../data/cardsData.js'

export const useModalStore = defineStore('modal', () => {
  // Состояние
  const isModalOpen = ref(false)
  const selectedProductId = ref(null)
  const selectedProductType = ref('') // 'cards', 'cards2', 'cards3'
  const show3dModel = ref(false)

  // Все продукты для поиска
  const allProducts = computed(() => {
    return [
      ...cards.map(item => ({ ...item, type: 'cards' })),
      ...cards2.map(item => ({ ...item, type: 'cards2' })),
      ...cards3.map(item => ({ ...item, type: 'cards3' }))
    ]
  })

  // Выбранный продукт
  const selectedProduct = computed(() => {
    if (!selectedProductId.value || !selectedProductType.value) return null
    return allProducts.value.find(
      product => product.id === selectedProductId.value && product.type === selectedProductType.value
    )
  })

  // Тип модального окна
  const modalType = computed(() => {
    if (!selectedProduct.value) return ''
    
    if (selectedProductType.value === 'cards3') {
      return 'tshirt'
    } else if (selectedProductType.value === 'cards2') {
      return 'hydizip'
    } else {
      return 'hydi'
    }
  })

  // Действия
  const openModal = (product) => {
    selectedProductId.value = product.id
    selectedProductType.value = product.type || product.category || 'cards'
    show3dModel.value = false
    isModalOpen.value = true

    disableBodyScroll()
  }

  const closeModal = () => {
    isModalOpen.value = false
    selectedProductId.value = null
    selectedProductType.value = ''
    show3dModel.value = false

    enableBodyScroll()
  }

  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden'
  }

  const enableBodyScroll = () => {
    document.body.style.overflow = 'auto'
  }

  const switchTo3D = () => {
    show3dModel.value = true
  }

  const switchTo2D = () => {
    show3dModel.value = false
  }

  return {
    // Состояние
    isModalOpen,
    selectedProduct,
    show3dModel,
    modalType,
    
    // Действия
    openModal,
    closeModal,
    switchTo3D,
    switchTo2D
  }
})