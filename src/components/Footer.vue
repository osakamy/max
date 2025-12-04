<script setup>

</script>

<template>
    <section class="footer">
        <div class="footer__container">
            <div class="footer__about">
                <div class="footer__about--brand">
                    <h4 class="footer__logo">Urban Wealth</h4>
                    <p class="footer__slogan">Отражая индивидуальность и стиль в каждом худи</p>
                </div>
                <div class="footer__about--shop">
                    <RouterLink to="/category" class="shop">Магазин</RouterLink>
                    <div class="footer__about--shop-items">
                        <RouterLink to="/cataloghydi" class="shop__item shop__item--hydi">Худи</RouterLink>
                        <RouterLink to="/cataloghydizip" class="shop__item">Зип-худи</RouterLink>
                        <RouterLink to="/catalogtshirt" class="shop__item">Футболки</RouterLink>
                    </div>
                </div>
                <div class="footer__about--info">
                    <h4>Информация</h4>
                    <div class="footer__about--info-items">
                        <p class="item__about">О бренде</p>
                        <p>Доставка</p>
                        <p>Возврат</p>
                    </div>
                </div>
                <div class="footer__about--contacts">
                    <h4>Контакты</h4>
                    <div class="footer__about--contacts-items">
                        <p class="item__mail">info@urbanwealth.ru</p>
                        <p>+7 (495) 123-45-67</p>
                    </div>
                    <div class="footer__about--icons">
                        <img src="../assets/image/inst.svg" alt="">
                        <img src="../assets/image/facebook.svg" alt="">
                        <img src="../assets/image/mail.svg" alt=""></img>
                    </div>
                </div>
            </div>
            <p class="footer__property-rights">© 2025 Urban Wealth. Все права защищены.</p>
        </div>
    </section>
</template>

<style scoped lang="scss">
.footer {


    &__about {
        display: flex;
        margin-top: 64px;
        justify-content: space-between;

        @media (max-width: 1024px) {
            margin-top: 50px;
            flex-wrap: wrap;
            gap: 30px;
        }
        
        @media (max-width: 768px) {
            margin-top: 40px;
            gap: 25px;
            flex-direction: column;
        }
        
        @media (max-width: 414px) {
            margin-top: 30px;
            gap: 20px;
        }

        &--brand {
            max-width: 225px;
            gap: 12px;

            @media (max-width: 768px) {
                max-width: 100%;
                text-align: center;
            }
        }

        &--icons {
            display: flex;
            gap: 16px;
            margin-top: 24px;

            @media (max-width: 768px) {
                justify-content: center;
                margin-top: 20px;
            }
            
            @media (max-width: 414px) {
                gap: 12px;
                margin-top: 15px;
            }
        }

        &--shop-items {
            display: flex;
            flex-direction: column;
            gap: 12px;

            @media (max-width: 768px) {
                gap: 10px;
            }
        }

        &--info-items {
            display: flex;
            flex-direction: column;
            gap: 12px;

            @media (max-width: 768px) {
                gap: 10px;
            }
        }

        &--contacts-items {
            display: flex;
            flex-direction: column;
            gap: 12px;

            @media (max-width: 768px) {
                gap: 10px;
            }
        }
    }

    &__property-rights {
        text-align: center;
        margin-top: 97px;
        margin-bottom: 64px;
        color: gray;

        @media (max-width: 1024px) {
            margin-top: 70px;
            margin-bottom: 50px;
        }
        
        @media (max-width: 768px) {
            margin-top: 50px;
            margin-bottom: 40px;
            font-size: 13px;
        }
        
        @media (max-width: 414px) {
            margin-top: 40px;
            margin-bottom: 30px;
            font-size: 12px;
        }
    }

    &__logo {
        border-left: black 1px solid;
        padding-left: 12px;
        margin-bottom: 15px;

        @media (max-width: 768px) {
            border-left: none;
            padding-left: 0;
            font-size: 18px;
        }
    }
}

.shop__item {
    color: black;
    text-decoration: none;
    color: gray;

    @media (max-width: 414px) {
        font-size: 13px;
    }

    &--hydi {
        margin-top: 15px;

        @media (max-width: 768px) {
            margin-top: 10px;
        }
    }
}

.item__about {
    margin-top: 15px;

    @media (max-width: 768px) {
        margin-top: 10px;
    }
}

.item__mail {
    margin-top: 15px;

    @media (max-width: 768px) {
        margin-top: 10px;
    }
}

.shop {
    font-weight: 500;
    text-decoration: none;
    color: black;

    @media (max-width: 414px) {
        font-size: 15px;
    }
}
p {
    color: gray;

    @media (max-width: 414px) {
        font-size: 13px;
    }
}

h4 {
    color: black;
    font-weight: 500;

    @media (max-width: 414px) {
        font-size: 16px;
    }
}
</style>