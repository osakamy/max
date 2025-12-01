import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  // Загружаем избранное из localStorage
  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem('hydi_favorites')
      if (!saved) return [] // Если нет сохраненных данных, возвращаем пустой массив
      
      const parsed = JSON.parse(saved)
      
      // Проверяем, что это массив (защита от поврежденных данных)
      if (!Array.isArray(parsed)) {
        console.warn('⚠️ Данные в localStorage повреждены, очищаем избранное')
        localStorage.removeItem('hydi_favorites')
        return []
      }
      
      // Фильтруем некорректные данные
      const validItems = parsed.filter(item => 
        item && 
        typeof item === 'object' && 
        item.key && 
        item.title && 
        item.image
      )
      
      console.log(`📦 Загружено ${validItems.length} товаров из избранного`)
      return validItems
    } catch (error) {
      console.error('❌ Ошибка при загрузке избранного:', error)
      localStorage.removeItem('hydi_favorites') // Очищаем поврежденные данные
      return []
    }
  }

  // Состояние - инициализируем пустым массивом
  const favorites = ref([])

  // Инициализируем store после создания
  const initializeStore = () => {
    favorites.value = loadFavorites()
  }

  // Геттер для проверки, есть ли товар в избранном
  const isFavorite = (product) => {
    if (!product) return false
    
    // Создаем уникальный ключ: тип + id
    const productType = product.type || 'cards'
    const productKey = `${productType}-${product.id}`
    
    return favorites.value.some(item => item.key === productKey)
  }

  // Сохраняем в localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem('hydi_favorites', JSON.stringify(favorites.value))
      console.log('💾 Избранное сохранено в localStorage')
    } catch (error) {
      console.error('❌ Ошибка при сохранении в localStorage:', error)
    }
  }

  // Добавить в избранное
  const addToFavorites = (product) => {
    if (!product || !product.id) {
      console.error('❌ Нельзя добавить в избранное: невалидный продукт')
      return
    }
    
    // Создаем уникальный ключ для идентификации товара
    const productType = product.type || 'cards'
    const productKey = `${productType}-${product.id}`
    
    // Проверяем, нет ли уже такого товара
    const existingIndex = favorites.value.findIndex(item => item.key === productKey)
    
    if (existingIndex === -1) {
      const favoriteItem = {
        key: productKey, // Уникальный ключ
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        paragraph: product.paragraph,
        type: productType,
        originalProduct: { ...product }, // Сохраняем копию оригинального объекта
        addedDate: new Date().toISOString()
      }
      
      favorites.value.push(favoriteItem)
      saveToStorage()
      
      console.log('✅ Товар добавлен в избранное:', productKey)
      console.log('📦 Всего в избранном:', favorites.value.length)
      
      return true
    } else {
      console.log('⚠️ Товар уже в избранном:', productKey)
      return false
    }
  }

  // Удалить из избранного
  const removeFromFavorites = (product) => {
    if (!product) {
      console.error('❌ Нельзя удалить из избранного: невалидный продукт')
      return false
    }
    
    const productType = product.type || 'cards'
    const productKey = `${productType}-${product.id}`
    const initialLength = favorites.value.length
    
    favorites.value = favorites.value.filter(item => item.key !== productKey)
    
    if (favorites.value.length !== initialLength) {
      saveToStorage()
      console.log('❌ Товар удален из избранного:', productKey)
      console.log('📦 Осталось в избранном:', favorites.value.length)
      return true
    }
    
    return false
  }

  // Переключить избранное
  const toggleFavorite = (product) => {
    if (!product) {
      console.error('❌ Нельзя переключить избранное: невалидный продукт')
      return
    }
    
    if (isFavorite(product)) {
      removeFromFavorites(product)
    } else {
      addToFavorites(product)
    }
  }

  // Очистить всё избранное
  const clearFavorites = () => {
    const count = favorites.value.length
    favorites.value = []
    saveToStorage()
    console.log(`🧹 Очищено ${count} товаров из избранного`)
  }

  // Получить количество избранных товаров
  const favoritesCount = computed(() => favorites.value.length)

  // Получить избранные товары по категории
  const getFavoritesByType = (type) => {
    return favorites.value.filter(item => item.type === type)
  }

  // Инициализируем store при создании
  initializeStore()

  return {
    // Состояние
    favorites,
    
    // Геттеры
    isFavorite,
    favoritesCount,
    getFavoritesByType,
    
    // Действия
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites
  }
})