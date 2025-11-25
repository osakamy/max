<script setup>
import { ref, nextTick } from 'vue'

const isSearchOpen = ref(false)
const inputRef = ref(null)

const toggleSearch = async () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    await nextTick()
    inputRef.value?.focus()
  }
}
</script>

<template>
  <section class="header">
    <div class="header__cantainer">
      <div class="hero">
        <p class="logo">Urban Wealth</p>
        <div class="navigation">
          <p class="navigation__main">ГЛАВНАЯ</p>
        </div>
        <div class="nav__icons">
          <div class="search-wrap" :class="{ open: isSearchOpen }">
            <input ref="inputRef" type="text" class="search-input" placeholder="Поиск..." aria-label="Поиск"
            />
          </div>
          <img src="../assets/image/search.svg" alt="search" class="search-icon" @click="toggleSearch"/>
          <img src="../assets/image/favorites.svg" alt="">
          <img src="../assets/image/account.svg" alt="">
          <img src="../assets/image/cart.svg" alt="">
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
}

.hero {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
}

.logo {
  font-weight: 500;
  border-left: black 1px solid;
  padding-left: 12px;
}

.navigation {
  display: flex;
  gap: 48px;
  justify-content: center;

  &__main {
    font-weight: 500;
    cursor: pointer;
  }
}

.nav__icons {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: end;

  .search-icon {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
}

.search-wrap {
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
}

.search-wrap.open {
  transform: scaleX(1);
  opacity: 1;
  margin-right: 8px;
  pointer-events: auto;
}

.search-input {
  display: inline-block;
  width: 190px;
  height: 34px;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  font-size: 14px;
  outline: none;
}
</style>
