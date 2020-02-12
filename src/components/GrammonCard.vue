<template>
  <div class="m-grammon__card" v-show="showCard">
    <div class="m-grammon__card__body">
      <h1 class="title staggered-rise-in">You Lose.</h1>
      <p class="subtitle staggered-rise-in">Play Again</p>
    </div>
    <div class="multi-button">
      <button class="btn btn-shock" @click="$emit('update:showCard', false)">取消</button>
      <button class="btn btn-shock" @click="$emit('update:showCard', false)">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GrammonCard',
  props: {
    showCard: {
      type: Boolean,
      default: false,
      required: true,
    }
  }
}
</script>

<style scoped lang="scss">
.m-grammon__card {
  position: fixed;
  left: 10vw;
  top: 15vh;
  display: flex;
  flex-direction: column;
  width: 80vw;
  padding: 10px;
  font-family: Lato, sans-serif;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0px 0.6px rgba(0, 0, 0, 0.028),
    0 0px 1.3px rgba(0, 0, 0, 0.04),
    0 0px 2.5px rgba(0, 0, 0, 0.05),
    0 0px 4.5px rgba(0, 0, 0, 0.06),
    0 0px 8.4px rgba(0, 0, 0, 0.072),
    0 0px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  opacity: 0;
  transform: scale(0.6);
  animation: bump-in 0.5s forwards;

  .m-grammon__card__body {
    height: 20vh;
    padding: 10px;
    font-size: 1.5em;
    letter-spacing: 0.1em;
    border: none;
    border-radius: 5px;
    transition: 0.5s;
    opacity: 0;
    animation: float-in 0.8s 0.5s forwards;
  }

  .multi-button {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .btn {
      // background: 
      margin-right: 20px;
      outline: none;
      width: 114px;
      font-weight: bold;
      line-height: 2em;
      opacity: 0;
      transform: translateY(20px);
      animation: float-in 0.8s forwards;

      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          animation-delay: 0.5s + 0.2s * $i;
        }
      }
    }
  }
}

@keyframes bump-in {
  50% {
    transform: scale(1.05);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>