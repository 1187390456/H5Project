// 发布动态
<template>
  <div class="containner-add">
    <div class="top">
        <img src="@/assets/return.png" />
        <span>New Post</span>
        <i>Post</i>
    </div>
    <div class="content">        
        <el-input class="input"  v-model="postInput" :rows="2" type="textarea"  placeholder="What do you want to share at this moment" resize="none" show-word-limit maxlength="200" :autosize="true"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        postInput:"",
    }
  },
  components: {

  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.containner-add{    
    img{
        object-fit: cover;  
    }
}
.top{
    margin: 0 16px;
    position: relative;
    height: 52px;
    line-height: 52px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #161616;
    img{
        height: 24px;
        width: 24px;
        position: absolute;
        left: 0;
        top:50%; 
        transform:translateY(-50%)
    }
    i{
        font-style: normal;
        position: absolute;
        right: 0;
        color:#A0A0A2;
        font-weight: normal
    }
}
.content{
    padding:0 16px;
    .input{
        font-size: 14px;
        ::v-deep .el-input__count{
             color: #A0A0A2;
        }
    }
}
::v-deep .el-textarea__inner{
    border:none !important;
    width: 100%;
    font-size:14px ;
}
::v-deep .el-textarea__inner::placeholder{
    color: #A0A0A2;
    font-size: 14px;
}
</style>
