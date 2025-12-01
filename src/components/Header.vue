<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { cards, cards2, cards3 } from '../data/cardsData.js'
import { useModalStore } from '@/stores/modalStore'
import { useFavoritesStore } from '@/stores/favoritesStore'

const modalStore = useModalStore()
const favoritesStore = useFavoritesStore()

const isSearchOpen = ref(false)
const inputRef = ref(null)
const searchQuery = ref('')
const showResults = ref(false)

// Компьютед свойство для количества избранных товаров
const favoritesCount = computed(() => {
  return favoritesStore.favoritesCount
})

// Объединяем все товары
const allProducts = computed(() => {
  return [
    ...cards.map(item => ({ ...item, category: 'cards' })),
    ...cards2.map(item => ({ ...item, category: 'cards2' })),
    ...cards3.map(item => ({ ...item, category: 'cards3' }))
  ]
})

// Фильтруем товары
const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return allProducts.value.slice(0, 6)
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  return allProducts.value.filter(product => 
    product.title.toLowerCase().includes(query) ||
    product.paragraph.toLowerCase().includes(query) ||
    product.price.toLowerCase().includes(query)
  ).slice(0, 100)
})

const toggleSearch = async () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    await nextTick()
    inputRef.value?.focus()
  } else {
    showResults.value = false
    searchQuery.value = ''
  }
}

const handleSearchInput = () => {
  showResults.value = searchQuery.value.length > 0
}

const handleSearchFocus = () => {
  if (searchQuery.value.length > 0) {
    showResults.value = true
  }
}

const handleSearchBlur = () => {
  setTimeout(() => {
    showResults.value = false
  }, 200)
}

// Используем store для открытия модалки
const selectProduct = (product) => {
  console.log('Выбран товар:', product)
  
  // Открываем модалку через store
  modalStore.openModal(product)
  
  // Закрываем поиск
  searchQuery.value = ''
  showResults.value = false
  isSearchOpen.value = false
}

// Закрываем результаты при клике вне поиска
const handleClickOutside = (event) => {
  const searchWrap = document.querySelector('.search__wrap')
  if (searchWrap && !searchWrap.contains(event.target)) {
    showResults.value = false
  }
}

// Добавляем обработчик клика вне
watch(showResults, (newVal) => {
  if (newVal) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<template>
  <section class="header">
    <div class="header__cantainer">
      <div class="hero">
        <p class="hero__logo">Urban Wealth</p>
        <div class="navigation">
          <RouterLink to="/" class="navigation__main">ГЛАВНАЯ</RouterLink>
        </div>
        <div class="nav__icons">
          <div class="search__wrap" :class="{ open: isSearchOpen }">
            <input 
              ref="inputRef" 
              type="text" 
              class="search__input" 
              placeholder="Поиск..." 
              aria-label="Поиск"
              v-model="searchQuery"
              @input="handleSearchInput"
              @focus="handleSearchFocus"
              @blur="handleSearchBlur"
            />
            <!-- Выпадающая панель с результатами -->
            <div v-if="showResults && filteredProducts.length > 0" class="search__results">
              <div class="search__results-header">
                <span>Найдено товаров: {{ filteredProducts.length }}</span>
              </div>
              <div class="search__results-list">
                <div 
                  v-for="product in filteredProducts" 
                  :key="`${product.category}-${product.id}`"
                  class="search__result-item"
                  @mousedown="selectProduct(product)"
                >
                  <img :src="product.image" :alt="product.title" class="result-item__image">
                  <div class="result-item__info">
                    <div class="result-item__title">{{ product.title }}</div>
                    <div class="result-item__price">{{ product.price }}</div>
                    <div class="result-item__category" v-if="product.category === 'cards3'">
                      <!-- <span class="badge-3d">3D модель</span> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Сообщение если ничего не найдено -->
            <div v-if="showResults && filteredProducts.length === 0 && searchQuery.trim()" class="search__no-results">
              Ничего не найдено по запросу "{{ searchQuery }}"
            </div>
          </div>
          <img src="../assets/image/search.svg" alt="search" class="search__icon" @click="toggleSearch"/>
          <RouterLink to="/favorites" class="favorites-wrapper">
            <img class="favorites__icon" src="../assets/image/favorites.svg" alt="Избранное">
            <!-- Бейдж с количеством избранных товаров -->
            <span v-if="favoritesCount > 0" class="favorites-badge">
              {{ favoritesCount }}
            </span>
          </RouterLink>
          <img src="../assets/image/account.svg" alt="Аккаунт">
          <img src="../assets/image/cart.svg" alt="Корзина">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.header {
  background-color: #ffffff;
  width: 100%;
  margin-bottom: 24px;
  position: relative;
}

.hero {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  &__logo {
    font-weight: 500;
    border-left: black 1px solid;
    padding-left: 12px;
  }
}

.navigation {
  display: flex;
  gap: 48px;
  justify-content: center;

  &__main {
    font-weight: 500;
    cursor: pointer;
    color: black;
    text-decoration: none;
    position: relative;
    
    &.router-link-active {
      font-weight: 600;
    }
  }
}

.favorites-link {
  display: flex;
  align-items: center;
  gap: 4px;
}

.favorites-nav-count {
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.nav__icons {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: end;
}

.favorites-wrapper {
  position: relative;
  display: inline-block;
  padding-top: 5px;
}

.favorites__icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.favorites-badge {
  position: absolute;
  top: -2px;
  right: -6px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  min-width: 16px;
  height: 16px;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.search {
  &__icon {
    cursor: pointer;
    width: 20px;
    height: 20px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  &__wrap {
    position: relative;
    display: inline-block;
    transform-origin: left center;
    transform: scaleX(0);
    opacity: 0;
    transition:
      transform 260ms cubic-bezier(.2,.9,.2,1),
      opacity 200ms ease,
      margin-right 200ms ease;
    margin-right: 0;
    pointer-events: none;
    vertical-align: middle;

    &.open {
      transform: scaleX(1);
      opacity: 1;
      margin-right: 8px;
      pointer-events: auto;
    }
  }

  &__input {
    display: inline-block;
    width: 250px;
    height: 36px;
    box-sizing: border-box;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: white;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      border-color: gray;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
    }

    &::placeholder {
      color: #999;
    }
  }

  // Выпадающая панель результатов
  &__results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 4px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    animation: slideDown 0.2s ease;

    &-header {
      padding: 10px 12px;
      border-bottom: 1px solid #eee;
      font-size: 12px;
      color: #666;
      background: #f8f9fa;
    }

    &-list {
      padding: 8px 0px;
    }
  }

  &__no-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-top: 4px;
    font-size: 14px;
    color: #666;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideDown 0.2s ease;
  }
}

.search__result-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
  }

  .result-item {
    &__image {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 4px;
      margin-right: 12px;
    }

    &__info {
      flex: 1;
      min-width: 0;
    }

    &__title {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__price {
      font-size: 13px;
      color: #007bff;
      font-weight: 600;
    }

    &__category {
      margin-top: 4px;
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>