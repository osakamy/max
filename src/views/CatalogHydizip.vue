<script setup>
import { cards2 } from '../data/cardsData.js'
import CatalogHydizipCard from '../components/CatalogHydizipCard.vue'
</script>

<template>
    <section>
        <div class="cards-container">
            <CatalogHydizipCard v-for="card in cards2" :key="card.id" :card="card"/>
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