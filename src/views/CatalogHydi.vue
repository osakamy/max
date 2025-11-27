<script setup>
import { cards } from '../data/cardsData.js'
import CatalogHydiCard from '../components/CatalogHydiCard.vue'
</script>

<template>
    <section>
        <div class="cards-container">
            <CatalogHydiCard v-for="card in cards" :key="card.id" :card="card"/>
        </div>
    </section>
</template>

<style scoped lang="scss">
.cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}
</style>