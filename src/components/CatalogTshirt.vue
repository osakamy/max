<script setup>
const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})
</script>

<template>
    <div class="card">
        <img class="card__img" :src="card.image" :alt="card.title">
        <div class="card-content">
            <h3>{{ card.title }}</h3>
            <p v-if="card.paragraph">{{ card.paragraph }}</p>
            <p class="price">{{ card.price }}</p>
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

  &__img {
    max-width: 400px;
    max-height: 400px;
    width: 100%;
    height: auto;
  }
}

.price {
  font-weight: bold;
  color: black;
}
</style>