<template>
  <div class="login-container">
    <login-method
      v-if="showWhichMethod == 0"
      @changeLoginMethod="changeLoginMethod"
    ></login-method>
    <verification-code
      v-if="showWhichMethod == 1"
      @changeLoginMethod="changeLoginMethod"
    ></verification-code>
    <create-account
      v-if="showWhichMethod == 2"
      @changeLoginMethod="changeLoginMethod"
    ></create-account>
  </div>
</template>

<script>
import LoginMethod from "../../components/Login/LoginMethod.vue";
import VerificationCode from "../../components/Login/VerificationCode.vue";
import CreateAccount from "../../components/Login/CreateAccount.vue";

export default {
  name: "",
  mixins: [],
  components: {
    LoginMethod,
    VerificationCode,
    CreateAccount,
  },
  props: {},
  data() {
    return {
      showWhichMethod: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    changeLoginMethod(index) {
      this.showWhichMethod = index;
    },
  },
};
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#534297 0%, #6377fd 81%, #1e98ff 100%);
  overflow: hidden;
}
</style>
