<template>
  <div class="c-grammon__btn">
    <div class="box">
      <div class="box__face box__face--front">{{btnText}}</div>
      <div class="box__face box__face--back"></div>
      <div class="box__face box__face--right"></div>
      <div class="box__face box__face--left"></div>
      <div class="box__face box__face--top"></div>
      <div class="box__face box__face--bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GrammonBtn",
  props: {
    btnText: {
      type: String,
      default: '悔棋',
      required: false,
    }
  }
};
</script>

<style scoped lang="scss">
.c-grammon__btn {
  user-select: none;
  &:hover {
    .box {
      .box__face--back {
        box-shadow: -30px 30px 50px rgba(0, 0, 0, 0.5);
      }
    }
  }
  .box {
    --box-width: 120px;
    --box-height: 80px;
    --box-depth: 20px;

    width: var(--box-width);
    height: var(--box-height);
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(30deg) rotateZ(0);
    transition: 0.5s;

    .box__face {
      position: absolute;
      font-size: 45px;
      font-weight: bold;
      color: #444;
      text-align: center;
    }

    .box__face--front,
    .box__face--back {
      width: var(--box-width);
      height: var(--box-height);
      line-height: var(--box-height);
    }

    .box__face--right,
    .box__face--left {
      width: var(--box-depth);
      height: var(--box-height);
      left: calc((var(--box-width) - var(--box-depth)) / 2);
      line-height: var(--box-height);
    }

    .box__face--top,
    .box__face--bottom {
      width: var(--box-width);
      height: var(--box-depth);
      top: calc((var(--box-height) - var(--box-depth)) / 2);
      line-height: var(--box-depth);
    }

    .box__face--front {
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      transition: 0.5s;
    }

    .box__face--right {
      background: darken(white, 10%);
      transition: 0.5s;
    }

    .box__face--bottom {
      background: darken(white, 30%);
      transition: 0.5s;
    }

    .box__face--back {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      transition: 0.5s;
    }

    .box__face--front {
      transform: rotateY(0deg) translateZ(calc(var(--box-depth) / 2));
    }
    .box__face--back {
      transform: rotateY(180deg) translateZ(calc(var(--box-depth) / 2));
    }

    .box__face--right {
      transform: rotateY(90deg) translateZ(calc(var(--box-width) / 2));
    }
    .box__face--left {
      transform: rotateY(-90deg) translateZ(calc(var(--box-width) / 2));
    }

    .box__face--top {
      transform: rotateX(90deg) translateZ(calc(var(--box-height) / 2));
    }
    .box__face--bottom {
      transform: rotateX(-90deg) translateZ(calc(var(--box-height) / 2));
    }
  }
}
</style>