<!-- components/CatalogHydiCard.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useModalStore } from '../stores/modalStore'

const favoritesStore = useFavoritesStore()
const modalStore = useModalStore()

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

// Переменная для отслеживания наведения на сердечко
const isHeartHovered = ref(false)

// Создаем объект продукта с типом
const product = computed(() => ({
  ...props.card,
  type: 'cards' // Добавляем тип категории
}))

// Проверяем, в избранном ли карточка
const isCardFavorite = computed(() => {
  return favoritesStore.isFavorite(product.value)
})

// Обработчик клика на сердечко
const handleHeartClick = (event) => {
  event.stopPropagation()
  favoritesStore.toggleFavorite(product.value)
}

// Обработчик клика на карточку (для открытия модалки)
const handleCardClick = () => {
  modalStore.openModal(product.value)
}
</script>

<template>
    <div class="card" @click="handleCardClick">
        <div class="card__header">
            <img class="card__img" :src="card.image" :alt="card.title">
            <!-- Иконка сердечка -->
            <button 
                class="heart-button"
                @click="handleHeartClick"
                @mouseenter="isHeartHovered = true"
                @mouseleave="isHeartHovered = false"
                :aria-label="isCardFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
            >
                <svg 
                    class="heart-icon" 
                    :class="{ 
                        'heart-icon--active': isCardFavorite,
                        'heart-icon--hovered': isHeartHovered && !isCardFavorite
                    }"
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                        :fill="isCardFavorite ? '#ff4757' : 'none'" 
                        :stroke="isCardFavorite ? '#ff4757' : (isHeartHovered ? '#ff4757' : '#666')" 
                        stroke-width="2"
                    />
                </svg>
            </button>
        </div>
        <div class="card-content">
            <h3>{{ card.title }}</h3>
            <p v-if="card.paragraph">{{ card.paragraph }}</p>
            <p class="card__price">{{ card.price }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  flex: 1 1 300px;
  max-width: 322px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: #999896;
    
    .heart-button {
      opacity: 1;
    }
  }

  &__header {
    position: relative;
  }

  &__price {
    font-weight: bold;
    color: black;
  }

  &__img {
    max-width: 400px;
    max-height: 400px;
    width: 288px;
    height: 384px;
    border-radius: 4px;
  }
}

.heart-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  
  &:hover {
    opacity: 1 !important;
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.heart-icon {
  transition: all 0.3s ease;
  
  &--active {
    animation: pulse 0.3s ease;
  }
  
  &--hovered {
    stroke: #ff4757;
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>