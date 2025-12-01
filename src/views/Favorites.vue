<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useModalStore } from '../stores/modalStore'
import CatalogHydiCard from '../components/CatalogHydiCard.vue'
import CatalogHydizipCard from '../components/CatalogHydizipCard.vue'
import CatalogTshirtCard from '../components/CatalogTshirtCard.vue'

const favoritesStore = useFavoritesStore()
const modalStore = useModalStore()

// Компьютед свойство для избранных товаров
const favoriteItems = computed(() => favoritesStore.favorites)

// Проверяем, есть ли избранные товары
const hasFavorites = computed(() => favoriteItems.value.length > 0)

// Преобразуем избранные товары обратно в формат для карточек
const getCardData = (item) => {
  return {
    id: item.originalProduct?.id || item.id,
    title: item.title,
    image: item.image,
    price: item.price,
    paragraph: item.paragraph,
    type: item.type,
    // Копируем все свойства из originalProduct
    ...item.originalProduct
  }
}

// Получаем компонент карточки в зависимости от типа
const getCardComponent = (type) => {
  switch(type) {
    case 'cards': return CatalogHydiCard
    case 'cards2': return CatalogHydizipCard
    case 'cards3': return CatalogTshirtCard
    default: return CatalogHydiCard
  }
}

// Функция для удаления товара из избранного
const removeFromFavorites = (item) => {
  const productToRemove = {
    id: item.originalProduct?.id || item.id,
    type: item.type
  }
  favoritesStore.removeFromFavorites(productToRemove)
}

// Функция для открытия модалки с товаром
const openProductModal = (item) => {
  const productData = getCardData(item)
  modalStore.openModal(productData)
}
</script>

<template>
    <section class="favorites">
        <div class="favorites__header">
            <h1>Избранное</h1>
            <div class="favorites__stats">
                <p v-if="!hasFavorites" class="empty-message">
                    У вас пока нет избранных товаров
                </p>
                <div v-else class="stats-container">
                    <p class="count-message">
                        Товаров в избранном: <strong>{{ favoriteItems.length }}</strong>
                    </p>
                </div>
            </div>
        </div>
        
        <div v-if="hasFavorites" class="favorites__container">
            <component
                v-for="item in favoriteItems" 
                :key="item.key"
                :is="getCardComponent(item.type)"
                :card="getCardData(item)"
                class="favorite-card"
            />
        </div>
        
        <div v-else class="empty-state">
            <div class="heart-icon-large">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ddd" stroke-width="1">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div>
            <h3>Список избранного пуст</h3>
            <p>Добавляйте товары в избранное, нажимая на сердечко</p>
        </div>
    </section>
</template>

<style scoped lang="scss">
.favorites {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 70vh;
    
    &__header {
        margin-bottom: 30px;
        text-align: center;
        
        h1 {
            font-size: 2.2rem;
            margin-bottom: 20px;
            color: #333;
            font-weight: 600;
        }
        
        .empty-message {
            color: #666;
            font-size: 1.1rem;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            display: inline-block;
        }
    }
    
    &__stats {
        .stats-container {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
            
            .count-message {
                font-size: 1.2rem;
                color: #333;
                margin-bottom: 15px;
                
                strong {
                    color: #ff4757;
                    font-size: 1.3rem;
                }
            }
        }
    }
    
    &__container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        margin-top: 20px;
    }
}

.favorite-card {
    animation: fadeIn 0.3s ease;
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #666;
    background: #f9f9f9;
    border-radius: 12px;
    margin-top: 30px;
    
    .heart-icon-large {
        margin-bottom: 25px;
        opacity: 0.3;
        
        svg {
            transition: all 0.3s ease;
            
            &:hover {
                transform: scale(1.1);
                stroke: #ff4757;
            }
        }
    }
    
    h3 {
        margin-bottom: 15px;
        font-size: 1.8rem;
        color: #333;
        font-weight: 500;
    }
    
    p {
        font-size: 1.1rem;
        max-width: 500px;
        margin: 0 auto 30px;
        line-height: 1.6;
        color: #777;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// Медиа запросы для адаптивности
@media (max-width: 768px) {
    .favorites {
        padding: 10px;
        
        &__header h1 {
            font-size: 1.8rem;
        }
        
        &__container {
            gap: 10px;
        }
    }
    
    .empty-state {
        padding: 40px 15px;
        
        h3 {
            font-size: 1.5rem;
        }
        
        p {
            font-size: 1rem;
        }
    }
}

@media (max-width: 480px) {
    .favorites__header h1 {
        font-size: 1.5rem;
    }
    
    .heart-icon-large svg {
        width: 60px;
        height: 60px;
    }
    
    .favorites__container {
        gap: 15px;
    }
    
    .empty-state {
        padding: 30px 10px;
        
        h3 {
            font-size: 1.3rem;
        }
        
        p {
            font-size: 0.95rem;
        }
    }
}
</style>