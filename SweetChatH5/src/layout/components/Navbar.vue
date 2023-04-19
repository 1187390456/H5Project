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

    <!-- 我的页面 -->
    <van-popup v-model="showMine" position="left">
      <mine />
    </van-popup>

    <!-- 我的页面点击具体内容 -->
    <van-popup
      v-model="showNextPopup"
      style="height: 100%; width: 100%; background: #f8f9fc"
    >
      <my-income v-if="nextType == 1"></my-income>
      <account-authorizatio v-if="nextType == 2"></account-authorizatio>
      <my-wallet v-if="nextType == 3"></my-wallet>
      <potential-income v-if="nextType == 6"></potential-income>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { chromeDownUrl } from "@/config";
import Mine from "@/components/Mine";
import MyIncome from "../../components/Mine/MyIncome.vue";
import PotentialIncome from "../../components/Mine/PotentialIncome.vue";
import MyWallet from "../../components/Mine/MyWallet.vue";
import AccountAuthorizatio from "../../components/Mine/AccountAuthorizatio.vue";

export default {
  data() {
    return {
      chromeDownUrl,
      activePath: this.$route.path,
      showMine: false,
      showNextPopup: false,
      nextType: 0,
    };
  },
  components: {
    Mine,
    MyIncome,
    PotentialIncome,
    MyWallet,
    AccountAuthorizatio,
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

    showMyPage() {
      this.showMine = true;
    },

    toShowMine() {
      this.showNextPopup = false;
      this.showMine = true;
    },

    changeNextType(type) {
      console.log("跳转===", type);
      this.showNextPopup = true;
      this.nextType = type;
    },
  },
  mounted() {
    this.$root.$on("toShowMine", this.toShowMine);
    this.$root.$on("changeNextType", this.changeNextType);
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
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
::v-deep .van-overlay {
  background: rgba(0, 0, 0, 0.4);
}
::v-deep .van-popup--left {
  height: 100%;
  width: 17.2267rem;
  // position: relative;
  // z-index: -2;
  background: #f8f9fc;
}
.search {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 0.64rem /* 12/18.75 */;
}
</style>
