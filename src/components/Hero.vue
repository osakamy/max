<script setup>

</script>

<template>
    <section class="hero">
        <div class="main">
            <div class="main__line"></div>
            <h3 class="main__name">Urban Wealth</h3>
            <p class="main__idea">Отражая индивидуальность и стиль</p>
            <button class="main__btn">СМОТРЕТЬ КОЛЛЕКЦИЮ</button>
        </div>
    </section>
</template>

<style scoped lang="scss">
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #2A2A2A;
    height: 772px;
    margin-bottom: 40px;

    &__name {
        color: white;
        font-size: 16px;
        padding-top: 30px;
    }

    &__idea {
        padding: 24px 0px 48px 0px;
        color: grey;
        font-size: 16px;
    }

    &__btn {
        color: black;
        background: white;
        padding: 18px 42px;
        font-size: 14px;
        cursor: pointer;
    }

    &__line {
        width: 64px;
        height: 1px;
        background-color: white;
    }
}
</style>