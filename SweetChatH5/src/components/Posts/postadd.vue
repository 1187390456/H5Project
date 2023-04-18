// 发布动态
<template>
  <div class="containner-add">
    <div class="top">
        <img src="@/assets/return.png" />
        <span>New Post</span>
        <i :class="postInput.length?'active':''" @click="submit">Post</i>
    </div>
    <div class="content">        
        <div class="con-input">
            <textarea class="textarea" v-model="postInput" rows="4" maxlength="200"></textarea>
            <span>{{postInputLen}}</span>
        </div>
        <div class="con-upload">
            <van-uploader class="file" v-model="fileList" :max-count="6" :after-read="afterRead">
                <img src="@/assets/images/posts/upload.png" alt="">
                <!-- <template #preview-cover="{ file }">
                    <img :src="file.content" alt="">
                    <div class="preview-cover van-ellipsis">{{ file.content }}</div>
                </template> -->
            </van-uploader>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        postInput:"",
        postInputLen:200,
        fileList:[],
    }
  },
  watch:{
    postInput(newVal,oldVal){
        this.postInputLen = 200 - newVal.length
    }
  },
  components: {

  },
  methods: {
    afterRead(file,fileList){
        console.log(file,fileList,"----------");
    },
    // 发表动态
    submit(){
        if(!this.postInput.length) return
        console.log("发表动态");
    }
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
    .active{
        color: #8032FF;
    }
}
.content{
    padding:0 16px;
    .con-input{
        text-align: right;
        font-size: 14px;
        span{
            color: #A0A0A2;
        }
        .textarea{
            width: 100%;
            resize : none;
            border:none;
        }
    }  
    .con-upload{
        margin-top: 10px;
        .file{
           img{
            width: 112px;
            height: 112px;
           }
           ::v-deep .van-uploader__input-wrapper,
           ::v-deep .van-uploader__preview-image{
              width: 112px;
              height: 112px;
              border-radius: 5px;
           }
           ::v-deep .van-uploader__preview{
                margin: 0 3px 3px 0;
                &:nth-of-type(3),&:nth-of-type(6){
                    margin-right: 0;
                }
           }
           
        }
    } 
   
}
::-webkit-scrollbar{
    display: none;
}

</style>
