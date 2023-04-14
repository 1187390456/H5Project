<template>
  <div>
    <div class="top-back">
      <img src="../../assets/images/login/goback@3x.png" alt="" />
    </div>
    <div class="title">
      <p v-if="type == 1">
        Verification <span style="display: block">code login</span>
      </p>
      <p v-if="type == 2">
        Fill in <span style="display: block">verification code</span>
      </p>
      <p v-if="type == 3">
        Create a new<span style="display: block">account</span>
      </p>
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    type: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.top-back {
  height: 2.346667rem /* 44/18.75 */;
  font-size: 0rem;
  display: flex;
  align-items: center;

  img {
    width: 1.28rem /* 24/18.75 */;
    height: 1.28rem /* 24/18.75 */;
    margin-left: 0.853333rem /* 16/18.75 */;
  }
}

.title {
  padding: 0 1.066667rem /* 20/18.75 */;
  margin-top: 0.32rem /* 6/18.75 */;

  p {
    // width: 12.64rem /* 237/18.75 */;
    color: #ffffff;
    font-size: 1.706667rem /* 32/18.75 */;
    margin: 0;
  }

  i {
    display: block;
    width: 2.88rem /* 54/18.75 */;
    height: 0.213333rem /* 4/18.75 */;
    background: #ffffff;
    border-radius: 0.213333rem /* 4/18.75 */;
    margin-top: 0.693333rem /* 13/18.75 */;
  }
}
</style>
