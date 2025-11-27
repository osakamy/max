<script setup>
import { ref } from 'vue'
import image1 from '../assets/image/swiper.jpg'
import image2 from '../assets/image/swiper2.jpg'
import image3 from '../assets/image/swiper3.jpg'

import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const slides = ref([
  { id: 1, image: image1, alt: 'Slide 1' },
  { id: 2, image: image2, alt: 'Slide 2' },
  { id: 3, image: image3, alt: 'Slide 3' },
])

const modules = [Pagination, Autoplay];

const onSwiper = (swiper) => {
  console.log('Swiper instance:', swiper)
}

const onSlideChange = () => {
  console.log('Slide changed')
}
</script>

<template>
  <div class="title">
    <div class="title__line"></div>
    <h3 class="title__name">Наиболее популярные</h3>
  </div>
  
  <swiper
    :modules="modules"
    :slides-per-view="2"
    :space-between="0"
    :loop="true"
    :pagination="{ clickable: true }"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide 
      class="swiper__slide"
      v-for="slide in slides" 
      :key="slide.id"
    >
      <img class="swiper__slide--img" :src="slide.image" :alt="slide.alt">
    </swiper-slide>
  </swiper>
</template>

<style scoped lang="scss">
.swiper {
  position: relative;
  width: 60%;
  height: 50vh;
  background: black;

  &__wrapper {
    background: black;
  }

  &__slide {

    &--img {
        width: 100%;
        height: 100%;
    }
  }
}

.swiper-pagination {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
    color: white;
    background: white;
    width: 3px;
    height: 3px;
}

:deep(.swiper-pagination-bullet) {
    background: gray !important;
    opacity: 1 !important;
    border: none !important;
    margin: 0 4px !important;
    width: 12px !important;
    height: 12px !important;
}

:deep(.swiper-pagination-bullet-active) {
    background: white !important;
    transform: scale(1.2) !important;
}

.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__name {
        text-align: center;
        margin-bottom: 40px;
        padding-top: 24px;
        font-weight: 500;
    }
    

    &__line {
        width: 64px;
        height: 1px;
        background-color: black;
        
    }
}
</style>