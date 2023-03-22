<template>
  <div class="fixPos">
    <div class="container">
      <div class="c1">
        <img src="../../assets/img/logo1Big.png" alt="" />
        <div class="c1-1">FansChat</div>
        <span class="c1-2">{{ $t("pp10") }}</span>
      </div>
      <a-button
        @click="$listenObj.type = true"
        id="downloadButton"
        class="c2"
        >{{ $t("pp8") }}</a-button
      >
    </div>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
.fixPos {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #003b62;
}
.container {
  width: 375px;
  height: 100vh;
  background: url("../../assets/img/downLoadBg.png") no-repeat;
  background-size: 100% 100vh;
  display: flex;
  justify-content: center;
  .c1 {
    margin-top: 2.55rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 4.5rem;
      height: 4.5rem;
    }
    .c1-1 {
      font-size: 1.5rem;
      font-family: STHeitiSC-Medium, STHeitiSC;
      font-weight: 500;
      color: #ffffff;
      line-height: 1.55rem;
      margin: 0.8rem 0 1.4rem 0;
    }
    .c1-2 {
      font-size: 0.7rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 1rem;
      opacity: 0.6;
      text-align: center;
      padding: 0 1.25rem;
    }
  }
  .c2 {
    position: fixed;
    bottom: 3.5rem;
    width: 11.95rem;
    height: 2.4rem;
    background: #8032ff;
    border-radius: 0.2rem;
    border: none;
    font-size: 0.8rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 1.1rem;
  }
}
</style>