<template>
  <div class="g-back__grammon" ref="contain">
    <canvas ref="canvas" @click="dropPiece"></canvas>
    <div class="c-grammon__flex">
       <grammon-btn />
    </div>
    <BackgroundGrammon />
    <GrammonCard :showCard.sync="isStop"/>
  </div>
</template>

<script>
import BackgroundGrammon from './BackgroundGrammon'
import GrammonBtn from './GrammonBtn'
import GrammonCard from './GrammonCard'

export default {
  name: "BackGrammon",
  components: {
    GrammonBtn,
    BackgroundGrammon,
    GrammonCard
  },
  data() {
    return {
      ctx: null,
      clientWidth: document.documentElement.clientWidth,
      piece: {
        white: {
          gradient: ['#d1d1d1', '#f9f9f9'],
          steps: []
        },
        black: {
          gradient: ['#0a0a0a', '#636766'],
          steps: []
        }
      },
      pieceType: 'black',
      isStop: false
    };
  },
  computed: {
    currentPieceSteps() {
      return this.piece[this.pieceType].steps;
    },
    blackPieceSteps() {
      return this.piece.black.steps;
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.$refs.canvas.width = this.clientWidth;
      this.$refs.canvas.height = this.$refs.contain.clientHeight;
      this.ctx = this.$refs.canvas.getContext("2d");
      this.getLayout();
    });
  },
  methods: {
    /**
     * @description [设置布局]
     */
    getLayout() {
      const dpr = this.dpr;
      for (let i = 1; i <= this.$refs.contain.clientHeight / dpr; i++) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(128, 64, 0)'
        this.ctx.moveTo(dpr, i * dpr);
        this.ctx.lineTo(~~(this.clientWidth / dpr) * dpr, i * dpr);
        this.ctx.stroke();
        this.ctx.closePath();
      }
      for (let i = 1; i <= this.clientWidth / dpr; i++) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(128, 64, 0)'
        this.ctx.moveTo(i * dpr, dpr);
        this.ctx.lineTo(i * dpr, ~~(this.$refs.contain.clientHeight / dpr) * dpr);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    },
    /**
     * @description
     *  1. canvas坐标系默认情况下是对准视窗左上角
     *  2. 以下是对于获取相对于canvas左上角的坐标系
     */
    windowToCanvas(canvas, x, y) {
      var canvasBox = canvas.getBoundingClientRect(); //获取canvas元素的边界框
      const startX =
        (x - canvasBox.left) * (canvas.width / canvasBox.width) - this.dpr;
      const startY =
        (y - canvasBox.top) * (canvas.height / canvasBox.height) - this.dpr;
      return {
        originX: x,
        originY: y,
        arcX: Math.round(Math.abs(startX / this.dpr)) * this.dpr + this.dpr, // 对于落子的X坐标进行四舍五入, 然后再乘dpr
        arcY: Math.round(Math.abs(startY / this.dpr)) * this.dpr + this.dpr
      };
    },
    hadPiece(arcX, arcY) {
      return Object.keys(this.piece).some(key => {
        return this.piece[key].steps.some(
          ([stepX, stepY]) => arcX === stepX && arcY === stepY
        );
      });
    },
    dropPiece(e) {
      if (this.isStop) return void 0;
      const { arcX, arcY, originX, originY } = this.windowToCanvas(
        this.$refs.canvas,
        e.clientX,
        e.clientY
      );

      if (this.hadPiece(arcX, arcY)) return 'hasOne';
      let gradient = this.ctx.createRadialGradient(
        arcX,
        arcY,
        10,
        arcX - 5,
        arcY - 5,
        0
      );
      const colorArrow = this.piece[this.pieceType].gradient;
      this.ctx.beginPath();
      this.ctx.arc(arcX, arcY, 10, 0, 2 * Math.PI);
      gradient.addColorStop(0, colorArrow[0]);
      gradient.addColorStop(1, colorArrow[1]);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      this.ctx.closePath();
      this.judgeWin(arcX, arcY, originX, originY);
      this.changePieceType(arcX, arcY, originX, originY);
    },
    changePieceType(arcX, arcY, originX, originY) {
      this.pieceType = this.pieceType === 'black' ? 'white' : 'black';
      
      if (this.pieceType === 'white') {
        this.judgeWin(arcX, arcY, originX, originY, 'black', 'Artificial')
      }
    },
    alphaCaculate(coordinate, direct) {
      let dropPiece
      switch (direct) {
        case 'Horizontal':
          dropPiece = this.dropPiece({
            clientX: coordinate[0] + this.dpr,
            clientY: coordinate[1]
          })
          if (dropPiece === 'hasOne') {
            this.dropPiece({
              clientX: coordinate[0] - this.dpr,
              clientY: coordinate[1]
            }, direct)
          }
          break
        case 'Longitudinal':
          dropPiece = this.dropPiece({
            clientX: coordinate[0],
            clientY: coordinate[1] + this.dpr
          })
          if (dropPiece === 'hasOne') {
            this.dropPiece({
              clientX: coordinate[0],
              clientY: coordinate[1] - this.dpr
            }, direct)
          }
          break
        default:
          break
      }
    },
    randomDropPiece([originX, originY], tryCollection) {
      const tryNum = tryCollection.splice(~~(Math.random() * 8), 1)
      let coordinate
      switch (tryNum[0]) {
        case 0:
         coordinate = {
          clientX: originX,
          clientY: originY + this.dpr
         }
         break
        case 1:
         coordinate = {
          clientX: originX,
          clientY: originY - this.dpr
         }
         break
        case 2:
         coordinate = {
          clientX: originX + this.dpr,
          clientY: originY
         }
         break
        case 3:
         coordinate = {
          clientX: originX - this.dpr,
          clientY: originY
         }
         break
        case 4:
         coordinate = {
          clientX: originX + this.dpr,
          clientY: originY + this.dpr
         }
         break
        case 5:
         coordinate = {
          clientX: originX + this.dpr,
          clientY: originY - this.dpr
         }
         break
        case 6:
         coordinate = {
          clientX: originX - this.dpr,
          clientY: originY + this.dpr
         }
         break
        case 7:
         coordinate = {
          clientX: originX - this.dpr,
          clientY: originY - this.dpr
         }
         break
        default:
          break
      }
      
      const dropePiece = this.dropPiece(coordinate)
      if (dropePiece === 'hasOne') {
        if (!tryCollection.length) return void 0
        this.randomDropPiece([originX, originY], tryCollection)
      }
    },
    judgeWin(arcX, arcY, originX, originY, pieceType = this.pieceType, Artificial) {
      if (Artificial) {
        const opponentApproachPiece = this.isApproachPiece([arcX, arcY], this.blackPieceSteps)
        const selfapproachPiece = this.isApproachPiece([arcX, arcY], this.currentPieceSteps)
        
        const opponetOnePieceWining = opponentApproachPiece.find(piece => {
          return piece.piece.length > 1
        })
        const selfOnePieceWining = selfapproachPiece.find(piece => {
          return piece.piece.length > 1
        })
        console.log('selfapproachPiece', selfapproachPiece);
        
        if (selfOnePieceWining) {
          const { direct, piece } = selfOnePieceWining
          if (direct === 'Horizontal') {
            const minPiece = Math.min(piece.)
          }
          this.alphaCaculate( direct)
        } else if (opponetOnePieceWining) {
          this.alphaCaculate([originX, originY], opponetOnePieceWining.direct)
        } else {
          this.randomDropPiece([originX, originY], [0, 1, 2, 3, 4, 5, 6, 7])
        }
      } else {
        const steps = this.piece[pieceType].steps;
        steps.push([arcX, arcY, originX, originY]);
        this.isStop = this.isApproachPiece([arcX, arcY]);
      }
    },
    /**
     * @description
     *  获胜条件:
     *    直线:
     *      1. 左边和右边个数相加再加上自身大于等于5就可以获胜
     *      2. 上边和下边个数相加再加上自身大于等于5就可以获胜
     *  @param {String} direct 方向
     *  @param {Array} [stepX, stepY] 落子的坐标
     *  @param {Array} [arcX, arcY] 进行对比的坐标
     *
     */
    filterStep(direct, [stepX, stepY], arc) {
      switch (direct) {
        case 'Horizontal':
          return {
            filterStep: arc.some(
              ([arcX, arcY]) => stepY === arcY && arcX !== stepX
            ),
            filterData: arc.some(
              ([arcX]) => Math.abs(arcX - stepX) <= Math.ceil(this.dpr)
            )
          };
        case 'Longitudinal':
          return {
            filterStep: arc.some(
              ([arcX, arcY]) => stepX === arcX && arcY !== stepY
            ),
            filterData: arc.some(
              ({ 1: arcY }) => Math.abs(arcY - stepY) <= Math.ceil(this.dpr)
            )
          };
        case 'TopLeft':
          return {
            filterStep: arc.some(
              ([arcX, arcY]) => stepX !== arcX && arcY !== stepY
            ),
            filterData: arc.some(
              ([arcX, arcY]) =>
                arcX - stepX <= Math.ceil(this.dpr) &&
                arcY - stepY <= Math.ceil(this.dpr)
            )
          };
        case 'BottomRight':
          return {
            filterStep: arc.some(
              ([arcX, arcY]) => stepX !== arcX && arcY !== stepY
            ),
            filterData: arc.some(
              ([arcX, arcY]) =>
                stepX - arcX <= Math.ceil(this.dpr) &&
                stepY - arcY <= Math.ceil(this.dpr)
            )
          };
        case 'TopRight':
          return {
            filterStep: arc.some(
              ([arcX, arcY]) => stepX !== arcX && arcY !== stepY
            ),
            filterData: arc.some(
              ([arcX, arcY]) =>
                stepX - arcX <= Math.ceil(this.dpr) &&
                stepY - arcY <= Math.ceil(this.dpr)
            )
          };
        case 'BottomLeft':
          return {
            filterStep: arc.some(
              ([arcX, arcY]) => stepX !== arcX && arcY !== stepY
            ),
            filterData: arc.some(
              ([arcX, arcY]) =>
                arcX - stepX <= Math.ceil(this.dpr) &&
                arcY - stepY <= Math.ceil(this.dpr)
            )
          };
        default:
          return null;
      }
    },
    getNum(direct, arc, arr = [], step = this.currentPieceSteps) {
      const steps = step.filter(
        step => this.filterStep(direct, step, arc).filterStep
      );
      const data = steps.filter(
        step => this.filterStep(direct, step, arc).filterData
      );

      if (direct === 'Horizontal' || direct === 'Longitudinal') {
        const index = direct === 'Horizontal' ? 0 : 1;
        for (let i = 0; i < steps.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (steps[i] && steps[i][index] === data[j][index]) {
              steps[i] = undefined;
            }
          }
        }
      }

      if (data.length) {
        return this.getNum(
          direct,
          data,
          arr.concat(data),
          steps.filter(Boolean)
        );
      } else {
        return arr;
      }
    },
    isApproachPiece(arc, pieces) {
      const Horizontal = this.getNum('Horizontal', [arc], [], pieces)
      const Longitudinal = this.getNum('Longitudinal', [arc], [], pieces)
      // const TopLeft = this.getNum('TopLeft', [arc], [], pieces && this.blackPieceSteps)
      // const BottomRight = this.getNum('BottomRight', [arc], [], pieces && this.blackPieceSteps)
      // const TopRight = this.getNum('TopRight', [arc], [], pieces && this.blackPieceSteps)
      // const BottomLeft = this.getNum('BottomLeft', [arc], [], pieces && this.blackPieceSteps)
      
      if (pieces) {
        return [
          {
            direct: 'Horizontal',
            piece: Horizontal
          },
          {
            direct: 'Longitudinal',
            piece: Longitudinal
          },
          // {
          //   direct: 'TopLeft',
          //   piece: TopLeft.concat(BottomRight)
          // },
          // {
          //   direct: 'TopRight',
          //   piece: TopRight.concat(BottomLeft)
          // }
        ]
      } else {
        return (
          Horizontal.length + 1 >= 5 ||
          Longitudinal.length + 1 >= 5
          // TopLeft.length + 1 + BottomRight.length >= 9 ||
          // TopRight.length + 1 + BottomLeft.length >= 9
        );
      }
    }
  }
};
</script>

<style scoped lang="scss">
.g-back__grammon {
  height: 60vh;
  .c-grammon__flex {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>