<script setup>
import { ref, nextTick } from 'vue'

const opened = ref(null) // id открытого блока

const toggle = async (id) => {
  opened.value = opened.value === id ? null : id
  await nextTick()
  animateHeight(id)
}

const animateHeight = (id) => {
  const el = document.getElementById(`faq-content-${id}`)
  if (!el) return

  const inner = el.querySelector('.faq__inner')
  const fullHeight = inner.scrollHeight

  if (opened.value === id) {
    el.style.maxHeight = fullHeight + 'px'
    el.style.opacity = '1'
  } else {
    el.style.maxHeight = '0px'
    el.style.opacity = '0'
  }
}
</script>

<template>
  <section class="faq">
    <div class="title">
      <div class="title__line"></div>
      <h2 class="title__name">FAQ</h2>
    </div>

    <div class="faq__container">

      <div 
        class="faq__details" 
        :class="{ open: opened === 1 }" 
        @click="toggle(1)"
      >
        <div class="faq__title">
          <span class="faq__text">Говно</span>
          <span class="faq__icon">{{ opened === 1 ? '−' : '+' }}</span>
        </div>

        <div class="faq__content" id="faq-content-1">
          <div class="faq__inner">
            <p class="faq__paragraph">Залупа</p>
          </div>
        </div>
      </div>

      <div 
        class="faq__details" 
        :class="{ open: opened === 2 }" 
        @click="toggle(2)"
      >
        <div class="faq__title">
          <span class="faq__text">Пенис</span>
          <span class="faq__icon">{{ opened === 2 ? '−' : '+' }}</span>
        </div>

        <div class="faq__content" id="faq-content-2">
          <div class="faq__inner">
            <p class="faq__paragraph">Хер</p>
          </div>
        </div>
      </div>

      <div 
        class="faq__details" 
        :class="{ open: opened === 3 }" 
        @click="toggle(3)"
      >
        <div class="faq__title">
          <span class="faq__text">Давалка</span>
          <span class="faq__icon">{{ opened === 3 ? '−' : '+' }}</span>
        </div>

        <div class="faq__content" id="faq-content-3">
          <div class="faq__inner">
            <p class="faq__paragraph">Хуй</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e8e8e8;
    padding: 20px;
  }

  &__details {
    max-width: 832px;
    width: 100%;
    margin-bottom: 10px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
  }

  &__icon {
    padding: 0.6px 10px;
    color: white;
    background: black;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
  }

  /* Контейнер, который анимируем */
  &__content {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, opacity 0.3s ease;
  }

  /* Внутренний блок для auto-height */
  &__inner {
    padding: 0 20px 15px;
  }
}

.title {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__name {
    padding-top: 24px;
  }

  &__line {
    width: 64px;
    height: 1px;
    background: black;
  }
}
</style>
