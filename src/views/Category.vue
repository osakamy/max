<script setup>

</script>

<template>
    <section>
        <div class="category">
            <h2 class="category__title">Категории</h2>
            <div class="category__cards">
                <RouterLink to="/cataloghydi" class="category__card">
                    <img class="category__card--img" src="../assets/image/hydi.png" alt="">
                    <p class="category__card--paragraph">Худи</p>
                </RouterLink>
                <RouterLink to="/cataloghydizip" class="category__card">
                    <img class="category__card--img" src="../assets/image/hydizip.png" alt="">
                    <p class="category__card--paragraph">Зип-худи</p>
                </RouterLink>
                <RouterLink to="/catalogtshirt" class="category__card">
                    <img class="category__card--img" src="../assets/image/t-shirt.png" alt="">
                    <p class="category__card--paragraph">Футболки</p>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    .category {
        margin: 60px 0px 60px 0px;

        &__cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 40px;
        }

        &__card {
            max-width: 500px;
            max-height: 500px;
            text-decoration: none;

            &--img {
                max-width: 500px;
                max-height: 500px;
            }

            &--paragraph {
                text-align: center;
                font-weight: 500;
                color: black;
            }
        }
        &__title {
            text-align: center;
        }
    }
</style>