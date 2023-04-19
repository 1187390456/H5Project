// 发布动态
<template>
  <div class="containner-add">
    <div class="top">
        <img src="@/assets/return.png" @click="clear" />
        <span>New Post</span>
        <i :class="postInput.length?'active':''" @click="submit">Post</i>
    </div>
    <div class="content">        
        <div class="con-input">
            <textarea class="textarea" placeholder="What do you want to share at this moment" v-model="postInput" rows="4" maxlength="200"></textarea>
            <span>{{postInputLen}}</span>
        </div>
        <div class="con-upload">
            <van-uploader class="file" :accept="uploadAccept" v-model="fileList"  multiple :max-count="maxCount" :before-read ="beforeRead" :after-read="afterRead" @delete="deletePreview">
                <img src="@/assets/images/posts/upload.png" alt="">
            </van-uploader>
        </div>
    </div>
  </div>
</template>

<script>
import { initOss, ossUpload } from "@/utils/aliyunoss.js";

export default {
  data() {
    return {
        postInput:"",
        postInputLen:200,
        fileList:[],
        maxCount:6, // 最大上上传数量
        fileType:1, // 文件类型
        uploadAccept:"video/*,image/*",
    }
  },
  watch:{
    postInput(newVal,oldVal){
        this.postInputLen = 200 - newVal.length
    }
  },
  components: {

  },
  mounted(){
    initOss();
  },
  methods: {
    // 文件读取完成回调
    afterRead(file,detail){
        console.log(this.fileType,this.maxCount,this.fileList,"----------");
    },
    // 文件读取前回调
    beforeRead(file,detail){
        console.log(file,detail,"========");
        var that = this;
        const isImage = /\.jpg|png|jpeg|bmp|gif|webp|psd|svg|tiff$/i.test(file.name);
        if (isImage) {
            this.fileType = 1
            this.maxCount = 6
            this.uploadAccept = "image/*"
        } else {
             this.fileType = 3
             this.maxCount = 1
             this.uploadAccept = "video/*"
        }
        ossUpload(file,{ fileType: that.fileType,fileSort: "dynamic",}).then((res)=>{
            if(res.result){
                file.fileID = res.data.fileID;             
            } else{
                return false
            }
        })
        return true
      
    },
    // 删除某个图片是时调用
    deletePreview(file,detail){
        console.log(file,detail,"删除");
        if(!this.fileList.length)this.uploadAccept = "video/*,image/*"
    },
    // 发表动态
    submit(){
        if(!this.postInput.length) return
        console.log("发表动态",this.fileList); 
        var videoID = 0
        var imageIDList = this.fileList.map((item)=>item.file.fileID).join(",")
        this.$api.postDynamic({videoID,imageIDList,contentText:this.postInput}).then((res)=>{
            if(res.result){
                this.$message.success("发布成功")
                this.clear()
                
            }
        })
    },
    // 清除
    clear(){
        this.$emit('exitAddPost')
        this.postInput = ""
        this.postInputLen = 200
        this.fileList = []
        this.maxCount = 6 
        this.fileType = 1 
    },
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
    span{
        font-family: Helvetica-Bold, Helvetica;
    }
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
        font-family: PingFangSC-Regular, PingFang SC;;
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
::v-deep .van-uploader__preview-delete{
    border-radius:0 0 0 .2133rem;
    background-color: rgba(0,0,0,.4);
    width: 1.0667rem;
    height: 1.0667rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .van-icon {
        font-size: 1.3333rem;
        font-weight: 600;
        position: static;
    }
}
::-webkit-scrollbar{
    display: none;
}

</style>
