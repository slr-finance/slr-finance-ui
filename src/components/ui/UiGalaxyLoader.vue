<template>
  <div class="ui-galaxy-loader flex justify-center items-center">
    <div
      class="loader"
      style="width: 140px; height: 100px"
    >
      <div class="galaxy">
        <div class="circle"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="orbit0">
          <div class="pos0">
            <div class="dot0"></div>
          </div>
        </div>
        <div class="orbit1">
          <div class="pos1">
            <div class="dot1"></div>
          </div>
        </div>
        <div class="orbit2">
          <div class="pos2">
            <div class="dot2"></div>
          </div>
        </div>
        <div class="orbit3">
          <div class="pos3">
            <div class="dot3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.ui-galaxy-loader > .loader > .galaxy > .orbit0 {
  animation-delay: 0s;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit0 > .pos0 {
  animation-delay: 0s;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit0 > .pos0 > .dot0 {
  animation-delay: 0s;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit1 {
  animation-delay: -1s;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit1 > .pos1 {
  animation-delay: -1s;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit1 > .pos1 > .dot1 {
  animation-delay: -1s;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit2 {
  animation-delay: -2s;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit2 > .pos2 {
  animation-delay: -2s;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit2 > .pos2 > .dot2 {
  animation-delay: -2s;
}

.ui-galaxy-loader > .loader {
  width: 100%;
  height: 100%;
}

.ui-galaxy-loader > .loader > .galaxy {
  transform: rotateX(75deg);
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
}

.ui-galaxy-loader > .loader > .galaxy > .circle {
  border-radius: 50%;
  border: 1px solid #eee;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  margin-left: -0.5em;
  animation: ui-galaxy-loader-spinner1 1.5s infinite ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotateX(-75deg);
}

.ui-galaxy-loader > .loader > .galaxy > .circle2 {
  border-radius: 50%;
  border: 1px solid #eee;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  margin-left: -0.5em;
  animation: ui-galaxy-loader-spinner2 2s infinite ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotateX(-75deg);
}

.ui-galaxy-loader > .loader > .galaxy > .circle3 {
  border-radius: 50%;
  border: 1px solid #eee;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  margin-left: -0.5em;
  animation: ui-galaxy-loader-spinner3 2.5s infinite ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotateX(-75deg);
}

.ui-galaxy-loader > .loader > .galaxy > .orbit0,
.ui-galaxy-loader > .loader > .galaxy > .orbit1,
.ui-galaxy-loader > .loader > .galaxy > .orbit2 {
  transform-style: preserve-3d;
  position: absolute;
  top: 50%;
  left: 50%;
  animation-name: orbit;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  width: 8em;
  height: 8em;
  margin-top: -4em;
  margin-left: -4em;
  border-radius: 50%;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit0 > .pos0,
.ui-galaxy-loader > .loader > .galaxy > .orbit1 > .pos1,
.ui-galaxy-loader > .loader > .galaxy > .orbit2 > .pos2 {
  position: absolute;
  width: 2em;
  height: 2em;
  margin-left: -1em;
  margin-top: -1em;
  animation-name: invert;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  left: 50%;
  top: -1px;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit0 > .pos0 > .dot0,
.ui-galaxy-loader > .loader > .galaxy > .orbit1 > .pos1 > .dot1,
.ui-galaxy-loader > .loader > .galaxy > .orbit2 > .pos2 > .dot2 {
  background-color: #eee;
  width: 0.5em;
  height: 0.5em;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -0.25em;
  margin-left: -0.25em;
  border-radius: 50%;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

/* Planet animation durations */
.ui-galaxy-loader > .loader > .galaxy > .orbit0, 
.ui-galaxy-loader > .loader > .galaxy > .orbit1,
.ui-galaxy-loader > .loader > .galaxy > .orbit2,
.ui-galaxy-loader > .loader > .galaxy > .orbit0 > .pos0,
.ui-galaxy-loader > .loader > .galaxy > .orbit1 > .pos1,
.ui-galaxy-loader > .loader > .galaxy > .orbit2 > .pos2 {
  animation-duration: 3s;
}

.ui-galaxy-loader > .loader > .galaxy > .circle {
  font-size: 6em;
}

.ui-galaxy-loader > .loader > .galaxy > .circle2 {
  font-size: 5em;
}

.ui-galaxy-loader > .loader > .galaxy > .circle3 {
  font-size: 4em;
}

.ui-galaxy-loader > .loader > .galaxy > .orbit0 > .pos0 > .dot0,
.ui-galaxy-loader > .loader > .galaxy > .orbit1 > .pos1 > .dot1,
.ui-galaxy-loader > .loader > .galaxy > .orbit2 > .pos2 > .dot2 {
  font-size: 0.2em;
}

@keyframes orbit {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}
@keyframes invert {
  0% {
    transform: rotateX(-90deg) rotateY(360deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(-90deg) rotateY(0deg) rotateZ(0deg);
  }
}
@keyframes ui-galaxy-loader-spinner1 {
  0% {
    transform: rotate3d(1, 0, 1, 0deg);
  }
  50% {
    transform: rotate3d(1, 0, 1, 180deg);
  }
  100% {
    transform: rotate3d(1, 0, 1, 360deg);
  }
}
@keyframes ui-galaxy-loader-spinner2 {
  0% {
    transform: rotate3d(0, 1, 1, 0deg);
  }
  50% {
    transform: rotate3d(0, 1, 1, 180deg);
  }
  100% {
    transform: rotate3d(0, 1, 1, 360deg);
  }
}
@keyframes ui-galaxy-loader-spinner3 {
  0% {
    transform: rotate3d(1, 1, 0, 0deg);
  }
  50% {
    transform: rotate3d(1, 1, 0, 180deg);
  }
  100% {
    transform: rotate3d(1, 1, 0, 360deg);
  }
}
</style>
