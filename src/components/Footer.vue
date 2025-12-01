<script>

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

        &--brand {
            max-width: 225px;
            gap: 12px;
        }

        &--icons {
            display: flex;
            gap: 16px;
            margin-top: 24px;
        }

        &--shop-items {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        &--info-items {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        &--contacts-items {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
    }

    &__property-rights {
        text-align: center;
        margin-top: 97px;
        margin-bottom: 64px;
        color: gray;
    }

    &__logo {
        border-left: black 1px solid;
        padding-left: 12px;
        margin-bottom: 15px;
    }
}

.shop__item {
    color: black;
    text-decoration: none;
    color: gray;

    &--hydi {
        margin-top: 15px;
    }
}

.item__about {
    margin-top: 15px;
}

.item__mail {
    margin-top: 15px;
}

.shop {
    font-weight: 500;
    text-decoration: none;
    color: black;
}
p {
    color: gray;
}

h4 {
    color: black;
    font-weight: 500;
}
</style>