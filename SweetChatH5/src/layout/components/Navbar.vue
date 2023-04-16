<template>
  <div class="navbar">
    <span>{{activePath}}</span>
    <img :src="loginInfo.userInfo && loginInfo.userInfo.avatar" alt="" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { chromeDownUrl } from "@/config";
export default {
  data() {
    return {
      chromeDownUrl,
      activePath:this.$route.path
    };
  },
  components: {},
  computed: {
    ...mapGetters(["loginInfo"]),
    ...mapState({
      user: (state) => state.user,
    }),
  },
  watch: {
    "$route.path":{
      handler (newVal, oldValue) {
        this.activePath = newVal.substring(1)
      },
      immediate:true
    }
  },
  methods: {},
  mounted() {
  },

};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 0.8533rem;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 1.44rem;
    font-weight: bold;
    color: #161616;
    font-family: Helvetica-Bold, Helvetica;
  }
  img {
    width: 1.92rem;
    height: 1.92rem;
    border-radius: 50%;
  }
}
</style>
