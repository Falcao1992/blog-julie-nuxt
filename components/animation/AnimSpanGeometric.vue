<template>
  <div class="geometricSpanAnim" :style="{ left: normalDirection && '-25px', right: !normalDirection && '-25px'}">
    <span class="bar bar1 gold" :style="{ right: normalDirection && '75px', left: !normalDirection && '75px'}" />
    <span class="bar bar2 gold" />
    <span class="bar bar3 gold" :style="{ left: normalDirection && '0', right: !normalDirection && '0'}" />
    <span class="bar bar4 gold" :style="{ right: normalDirection && '0', left: !normalDirection && '0'}" />
  </div>
</template>

<script>
export default {
name: "AnimSpanGeometric",
  props: {
  normalDirection: {
    type: Boolean,
    require: true
  }
  }
}
</script>

<style scoped>
.geometricSpanAnim {
  position: absolute;
  width: 100px;
  height: 60px;
  top: -25px;
}
.bar {
  position: absolute;
}
.bar1 {
  bottom: 0;
  right: 75px;
  height: 4px;
  width: 25px;
  max-width: 0;
  transition: max-width .4s linear;
}
.bar2 {
  bottom: 0;
  width: 4px;
  height: inherit;
  max-height: 0;
  transition: max-height .4s linear .4s;
}
.bar3 {
  height: 4px;
  width: inherit;
  max-width: 0;
  transition: max-width .4s linear .8s;
}
.bar4 {
  top: 0;
  width: 4px;
  height: inherit;
  max-height: 0;
  transition: max-height .4s linear 1.2s;
}

.animateBar1 {
  max-width: 25px;
}
.animateBar2 {
  max-height: 60px;
}
.animateBar3 {
  max-width: 100px;
}
.animateBar4 {
  max-height: 25px;
}
</style>
