<script setup>
import { cards2 } from '../data/cardsData.js'
import CatalogHydizipCard from '../components/CatalogHydizipCard.vue'
import Modal from '../components/ModalHydizip.vue'
import { ref } from 'vue'


const visible = ref('none')
const selectedCardId = ref(null)

function showModal(id) {
    selectedCardId.value = id
    visible.value = 'flex'
}

function closeModal() {
    visible.value = 'none'
    selectedCardId.value = null
}
</script>

<template>
    <section>
        <div class="cards__container">
            <CatalogHydizipCard v-for="card in cards2" :key="card.id" :card="card" @ClickCard="showModal"/>
        </div>
        <div class="modal" :style="{display: `${visible}`}">
            <template v-for ="card in cards2" :key="card.id">
                <Modal v-if ="card.id ===  selectedCardId"
                :image="card.image"
                :title="card.title"
                :paragraph="card.paragraph"
                :price="card.price"
                @closeModal="closeModal"
                />
            </template>
        </div>
    </section>
</template>

<style scoped lang="scss">
.cards__container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    // &__
}
</style>