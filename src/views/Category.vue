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
        margin: 60px 0px;

        @media (max-width: 1024px) {
            margin: 50px 0px;
        }
        
        @media (max-width: 768px) {
            margin: 40px 0px;
        }
        
        @media (max-width: 414px) {
            margin: 30px 15px;
        }

        &__cards {
            display: flex;
            gap: 40px;

                @media (max-width: 1024px) {
                gap: 30px;
            }
            
            @media (max-width: 768px) {
                gap: 20px;
                flex-wrap: wrap;
            }
            
            @media (max-width: 414px) {
                gap: 15px;
                flex-direction: column;
                align-items: center;
            }
        }

        &__card {
            max-width: 500px;
            max-height: 500px;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 8px;
            border: 1px solid #ccc;

             @media (max-width: 1024px) {
            max-width: 400px;
            max-height: 400px;
            }
            
            @media (max-width: 768px) {
                max-width: 300px;
                max-height: 300px;
            }
            
            @media (max-width: 414px) {
                max-width: 100%;
                max-height: 350px;
                width: 100%;
            }

            &:hover {
                transform: translateY(-8px);
                border-color: #999896;
            }

            &--img {
                max-width: 498px;
                max-height: 498px;

                @media (max-width: 1024px) {
                max-width: 398px;
                max-height: 398px;
                }
                
                @media (max-width: 768px) {
                    max-width: 298px;
                    max-height: 298px;
                }
                
                @media (max-width: 414px) {
                    max-width: 100%;
                    max-height: 300px;
                }
            }

            &--paragraph {
                text-align: center;
                font-weight: 500;
                color: black;

                @media (max-width: 414px) {
                    font-size: 14px;
                    padding: 8px;
                }
            }
        }
        &__title {
            text-align: center;

            @media (max-width: 768px) {
                font-size: 24px;
            }
            
            @media (max-width: 414px) {
                font-size: 20px;
            }
        }
    }

    h2 {
        margin-bottom: 24px;
        font-weight: 500;

        @media (max-width: 1024px) {
            margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
            margin-bottom: 16px;
            font-size: 22px;
        }
        
        @media (max-width: 414px) {
            margin-bottom: 12px;
            font-size: 18px;
        }
    }
</style>