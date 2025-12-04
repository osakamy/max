<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
    <section class="hero">
        <div class="main">
            <div class="main__line"></div>
            <h3 class="main__name">Urban Wealth</h3>
            <p class="main__idea">Отражая индивидуальность и стиль</p>
            <RouterLink to="/category" class="main__btn">СМОТРЕТЬ КОЛЛЕКЦИЮ</RouterLink>
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

    @media (max-width: 1024px) {
        height: 600px;
        margin-bottom: 35px;
    }
    
    @media (max-width: 768px) {
        height: 500px;
        margin-bottom: 30px;
    }
    
    @media (max-width: 414px) {
        height: 400px;
        margin-bottom: 25px;
        padding: 0 15px;
    }

    &__name {
        color: white;
        font-size: 16px;
        padding-top: 30px;

        @media (max-width: 768px) {
            font-size: 15px;
            padding-top: 25px;
        }
        
        @media (max-width: 414px) {
            font-size: 14px;
            padding-top: 20px;
            text-align: center;
        }
    }

    &__idea {
        padding: 24px 0px 48px 0px;
        color: grey;
        font-size: 16px;

        @media (max-width: 768px) {
            padding: 20px 0px 40px 0px;
            font-size: 15px;
        }
        
        @media (max-width: 414px) {
            padding: 16px 0px 32px 0px;
            font-size: 14px;
            text-align: center;
        }
    }

    &__btn {
        color: black;
        background: white;
        padding: 18px 42px;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none;
        border-color: transparent;
        border-radius: 5px;

        @media (max-width: 768px) {
            padding: 15px 35px;
            font-size: 13px;
        }
        
        @media (max-width: 414px) {
            padding: 12px 28px;
            font-size: 12px;
            width: 100%;
            max-width: 250px;
            text-align: center;
        }
    }

    &__line {
        width: 64px;
        height: 1px;
        background-color: white;

        @media (max-width: 414px) {
            width: 48px;
        }
    }
}
</style>