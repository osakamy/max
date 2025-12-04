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

    @media (max-width: 1024px) {
        gap: 15px;
        padding: 15px;
    }

    @media (max-width: 768px) {
        gap: 12px;
        padding: 12px;
        justify-content: center;
    }
    
    @media (max-width: 414px) {
        gap: 10px;
        padding: 10px;
        flex-direction: column;
        align-items: center;
    }
}
</style>