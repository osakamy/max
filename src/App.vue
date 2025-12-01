<!-- App.vue -->
<script setup>
import { RouterView } from 'vue-router'
import AppLayout from './Layout/AppLayout.vue'
import ModalTshirt from './components/ModalTshirt.vue'
import ModalHydizip from './components/ModalHydizip.vue'
import ModalHydi from './components/ModalHydi.vue'
import { useModalStore } from './stores/modalStore'

const modalStore = useModalStore()
</script>

<template>
  <main class="container">
    <AppLayout>
      <RouterView/>
    </AppLayout>
    
    <!-- Модальное окно для футболки -->
    <ModalTshirt
      v-if="modalStore.isModalOpen && modalStore.modalType === 'tshirt' && modalStore.selectedProduct"
      :image="modalStore.selectedProduct.image"
      :title="modalStore.selectedProduct.title"
      :price="modalStore.selectedProduct.price"
      :paragraph="modalStore.selectedProduct.paragraph"
      :show3dModel="modalStore.show3dModel"
      @closeModal="modalStore.closeModal"
      @switchTo3D="modalStore.switchTo3D"
      @switchTo2D="modalStore.switchTo2D"
    />
    
    <!-- Модальное окно для гидрокостюма -->
    <ModalHydizip
      v-if="modalStore.isModalOpen && modalStore.modalType === 'hydizip' && modalStore.selectedProduct"
      :image="modalStore.selectedProduct.image"
      :title="modalStore.selectedProduct.title"
      :price="modalStore.selectedProduct.price"
      :paragraph="modalStore.selectedProduct.paragraph"
      :show3dModel="modalStore.show3dModel"
      @closeModal="modalStore.closeModal"
      @switchTo3D="modalStore.switchTo3D"
      @switchTo2D="modalStore.switchTo2D"
    />
    
    <!-- Модальное окно для Hydi -->
    <ModalHydi
      v-if="modalStore.isModalOpen && modalStore.modalType === 'hydi' && modalStore.selectedProduct"
      :image="modalStore.selectedProduct.image"
      :title="modalStore.selectedProduct.title"
      :price="modalStore.selectedProduct.price"
      :paragraph="modalStore.selectedProduct.paragraph"
      :show3dModel="modalStore.show3dModel"
      @closeModal="modalStore.closeModal"
      @switchTo3D="modalStore.switchTo3D"
      @switchTo2D="modalStore.switchTo2D"
    />
  </main>
</template>

<style scoped>
.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
}
</style>