<template>
  <div class="navbar">
    <span>{{ activePath }}</span>
    <div
      v-if="activePath == 'Chats' && user.showSearch"
      class="search"
      @click="OnClickSearch"
    >
      <img src="../../assets/images/chats/search.png" alt="" />
    </div>
    <img
      :src="loginInfo.userInfo && loginInfo.userInfo.avatar"
      alt=""
      @click="showMyPage"
    />
    <van-popup v-model="showMine" position="left" :overlay="false">
      <mine />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { chromeDownUrl } from "@/config";
import Mine from "@/components/Mine";

export default {
  data() {
    return {
      chromeDownUrl,
      activePath: this.$route.path,
      showMine: false,
    };
  },
  components: {
    Mine,
  },
  computed: {
    ...mapGetters(["loginInfo"]),
    ...mapState({
      user: (state) => state.user,
    }),
  },
  watch: {
    "$route.path": {
      handler(newVal, oldValue) {
        this.activePath = newVal.substring(1);
      },
      immediate: true,
    },
  },
  methods: {
    OnClickSearch() {
      // console.log('vue', this.$store); //this.$store.state.user.showSearch
    },
  },
  methods: {
    showMyPage() {
      this.showMine = true;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
    display: none;
} 
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
::v-deep .van-popup--left {
  height: 100%;
  width: 17.2267rem;
  // position: relative;
  // z-index: -2;
  background: #F8F9FC;

}
.search {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 0.64rem /* 12/18.75 */;
}
</style>
