<template>
  <div class="navbar">
    <span>Discover</span>
    <img src="https://img2.baidu.com/it/u=260211041,3935441240&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681405200&t=1225abc639a903c582497356f281b638" alt="">
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { chromeDownUrl } from "@/config";
export default {
  data() {
    return {
      noticeList: "", //气泡数据
      visible: false,
      fullscreen: false,
      rotate: true,
      chromeDownUrl,
      dropMenu: false,
      bloggerList: [],
    };
  },
  components: {},
  computed: {
    ...mapGetters(["bloggerInfo"]),
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {

  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.navbar{
    padding: 0 .8533rem;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    span{
        font-size: 1.44rem;
        font-weight: bold;
        color: #161616;
        font-family: Helvetica-Bold, Helvetica;

    }
    img{
        width: 1.92rem;
        height: 1.92rem;
        border-radius: 50%;
    }
}
</style>
