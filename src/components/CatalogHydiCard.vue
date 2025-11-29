<script setup>
const emit = defineEmits(['ClickCard'])

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})
</script>

<template>
    <div class="card" @click="emit('ClickCard', card.id)">
        <img class="card__img" :src="card.image" :alt="card.title">
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
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: #999896;
  }

  &__price{
    font-weight: bold;
    color: black;
  }
  

  &__img {
    max-width: 400px;
    max-height: 400px;
    width: 100%;
    height: auto;
  }
}
</style>