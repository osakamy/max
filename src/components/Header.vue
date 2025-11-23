<script>

</script>

<template>
    <section class="header">
        <div class="header__cantainer">
            <div class="hero">
                <p class="logo">Urban Wealth</p>
                <div class="navigation">
                    <p>ГЛАВНАЯ</p>
                    <p>КАТАЛОГ</p>
                    <p>ЖЕНЩИНАМ</p>
                    <p>МУЖЧИНАМ</p>
                </div>
                <div class="nav__icons">
                    <img src="../assets/image/search.svg" alt="">
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
    display: flex;
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
}

.nav__icons {
    display: flex;
    gap: 24px;
}
</style>