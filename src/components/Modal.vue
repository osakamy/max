<script setup>
const props = defineProps({
    image: String,
    title: String,
    price: String,
    paragraph: String,
})

const emit = defineEmits(['closeModal'])

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        emit('closeModal')
    }
}
</script>

<template>
<div class="modal__overlay" @click="handleOverlayClick">
    <div class="modal__window">
        <img class="modal__window--img" :src="props.image"  alt="">
        <div class="modal__window--info">
            <h3 class="modal__window--title">{{props.title}}</h3>
            <p>{{props.paragraph}}</p>
            <p>{{props.price}}</p>
        </div>
    </div>
</div>
    
</template>

<style scoped lang="scss">
    .modal {

        &__overlay {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            background: transparent;
        }

        &__window {
        display: flex;
        background: rgb(228, 224, 224);
        width: 70%;
        height: 70%;

        &--title {
            padding-top: 20px;
        }

        &--info {
            display: flex;
            flex-direction: column;
            row-gap: 250px;
            margin-left: 20px;
        }

        &--img {
            max-width: 100%;
        }
    }
    }
</style>