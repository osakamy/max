<script setup>
const toggleIcon = (event) => {
  const details = event.currentTarget
  const icon = details.querySelector('.faq__icon')
  
  // Закрываем все другие открытые details
  if (details.open) {
    const allDetails = document.querySelectorAll('.faq__details')
    allDetails.forEach(otherDetails => {
      if (otherDetails !== details && otherDetails.open) {
        otherDetails.open = false
        const otherIcon = otherDetails.querySelector('.faq__icon')
        otherIcon.textContent = '+'
      }
    })
  }
  icon.textContent = details.open ? '−' : '+'
}
</script>

<template>
    <section class="faq">
        <div class="title">
            <div class="title__line"></div>
            <h2 class="title__name">FAQ</h2>
        </div>
        <div class="faq__container">
            <details class="faq__details" @toggle="toggleIcon">
                <summary class="faq__title">
                    <span class="faq__text">Говно</span>
                    <span class="faq__icon">+</span>
                </summary>
                <p class="faq__paragraph">Залупа</p>
            </details>
            <details class="faq__details" @toggle="toggleIcon">
                <summary class="faq__title">
                    <span class="faq__text">Пенис</span>
                    <span class="faq__icon">+</span>
                </summary>
                <p class="faq__paragraph">Хер</p>
            </details>
            <details class="faq__details" @toggle="toggleIcon">
                <summary class="faq__title">
                    <span class="faq__text">Давалка</span>
                    <span class="faq__icon">+</span>
                </summary>
                <p class="faq__paragraph">Хуй</p>
            </details>
        </div>
    </section>
</template>

<style scoped lang="scss">
.faq {
    &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #e8e8e8;
    }

    &__details {
        max-width: 832px;
        width: 100%;
        margin-bottom: 10px;
    }

    &__title {
        cursor: pointer;
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        &::-webkit-details-marker {
            display: none;
        }
    }

    &__text {
        flex-grow: 1;
    }

    &__icon {
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
    }
}

.title {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__name {
        text-align: center;
        padding-top: 24px;
    }

    &__line {
        width: 64px;
        height: 1px;
        background-color: black;
    }
}
</style>