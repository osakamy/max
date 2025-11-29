<script setup>
import { cards3 } from '../data/cardsData.js'
import TshirtCard from '../components/CatalogTshirtCard.vue'
import Modal from '../components/Modal.vue'
import { ref } from 'vue'

const isModalVisible = ref(false)
const selectedCard = ref(null)
const show3dModel = ref(false)

function showModal(id) {
    selectedCard.value = cards3.find(card => card.id === id)
    isModalVisible.value = true
    show3dModel.value = false
}

function closeModal() {
    isModalVisible.value = false
    selectedCard.value = null
    show3dModel.value = false
}

function switchTo3D() {
    show3dModel.value = true
}

function switchTo2D() {
    show3dModel.value = false
}
</script>

<template>
    <section>
        <div class="cards__container">
            <TshirtCard 
                v-for="card in cards3" 
                :key="card.id" 
                :card="card" 
                @ClickCard="showModal"
            />
        </div>

        <!-- Модальное окно -->
        <Modal 
            v-if="isModalVisible && selectedCard"
            :image="selectedCard.image"
            :title="selectedCard.title"
            :paragraph="selectedCard.paragraph"
            :price="selectedCard.price"
            :show3dModel="show3dModel"
            @closeModal="closeModal"
            @switchTo3D="switchTo3D"
            @switchTo2D="switchTo2D"
        />
    </section>
</template>

<style scoped lang="scss">
.cards__container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}
</style>