<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// Получаем emit от Header и передаем дальше
const emit = defineEmits(['openProductModal'])

const handleOpenProductModal = (product) => {
  emit('openProductModal', product)
}
</script>

<template>
<div class="layout">
    <Header @open-product-modal="handleOpenProductModal"/>
    <slot></slot>
    <Footer/>
</div>
</template>

<style scoped>
.layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>