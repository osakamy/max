<script setup>
import { cards } from '../data/cardsData.js'
import CatalogHydiCard from '../components/CatalogHydiCard.vue'

// НЕ импортируем modalStore здесь - всё управляется из App.vue
</script>

<template>
    <section>
        <div class="cards__container">
            <CatalogHydiCard 
                v-for="card in cards" 
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