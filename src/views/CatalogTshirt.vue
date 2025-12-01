<script setup>
import { cards3 } from '../data/cardsData.js'
import CatalogTshirtCard from '../components/CatalogTshirtCard.vue'

// НЕ импортируем modalStore здесь - всё управляется из App.vue
</script>

<template>
    <section>
        <div class="cards__container">
            <CatalogTshirtCard 
                v-for="card in cards3" 
                :key="card.id" 
                :card="card"
            />
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
</style>