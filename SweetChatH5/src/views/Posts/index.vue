// 动态
<template>
  <div class="containner-posts">
    <div class="sel">
        <div class="btn all" :class="showType?'':'active'" @click="changeType(0)">All</div>
        <div class="btn interested" :class="showType?'active':''" @click="changeType(1)">Interested</div>
    </div>
    <van-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
        <div class="content" v-if="postList.length" v-infinite-scroll="load" infinite-scroll-distance="62" :infinite-scroll-disabled="disabled">
        <div v-for="item in postList" :key="item.id">
            <div class="con-info">
                <img :src="item.authorInfo.avatar" alt="">
                <div class="info">
                    <div class="name">{{item.authorInfo.nickname}}</div>
                    <div class="mark" v-if="item.authorInfo.identity">
                        <img src="@/assets/images/discover/attestation.png" alt="">
                        <span>Miss World 2019 No.3</span>
                        <img src="@/assets/images/discover/terrace.png" alt="">
                        <span>154.3K Fans</span>
                    </div>
                </div>
            </div>
            <div class="con-center">
                {{item.content}}
            </div>
            <div class="con-img" v-if="item.imageList" :class="{img2:item.imageList.length == 2,'img-more':item.imageList.length >= 2,img3:item.imageList.length >= 3,img4:item.imageList.length == 4}" >
                <img v-for="(imgItem,imgI) in item.imageList" :key="imgI" :src="imgItem" alt="">
            </div>
            <div class="con-btm">
                <div class="time">{{item.postTime}}｜{{item.postAddress}}</div>
                <div class="bottom">
                    <div>
                        <img src="@/assets/images/posts/like.png" alt="">
                        <span>{{item.likeCount}}</span>
                        <img src="@/assets/images/posts/comment.png" alt="">
                        <span>{{item.commentCount}}</span>
                    </div>
                    <img src="@/assets/images/posts/more.png" alt="">
                </div>
            </div>
        </div>
        <div class="no-more" v-show="noMore">Already at bottom</div>
        </div>
    </van-pull-refresh>
    <div class="addpost">
        <img src="@/assets/images/posts/addpost.png" alt="">
        <span>New Post</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        showType:0,
        postList:[],
        noMore :false,
        pageNum:1,
        isLoading:false
    }
  },
  components: {

  },
  computed:{
    disabled () {
        return this.noMore
    }
  },
  mounted(){
    this.getInitData()
  },
  methods: {
    getInitData(){
        this.$api.postsList({pageNum:this.pageNum}).then((res)=>{
            console.log(res);
            if(res.result){
                this.postList.push(...res.data.list)
                this.noMore = res.data.isEnd
                this.pageNum = res.data.pageNum
            } else{
                this.$messages.error(res.errorMsg)
            }
        })
    },
    changeType(type){
        this.showType = type
    },
    load(){
        console.log("正在加载中。。。。。");
        this.getInitData()
    },
    onRefresh(){
        console.log("下拉刷新");
    },
    
  }
}
</script>

<style scoped lang="scss">
.containner-posts{    
    box-sizing: border-box;
    padding: 0 15.9994px;
    img{
        object-fit: cover;  
    }
}
.top{
    display: flex;
    height: 2.7733rem;
    justify-content: space-between;
    align-items: center;
    span{
        font-size: 1.44rem;
        font-weight: bold;
        color: #161616;

    }
    img{
        width: 1.92rem;
        height: 1.92rem;
        border-radius: 50%;
    }
}
.sel{
    margin:.4267rem 0;
    .btn{
        height: 1.5467rem;           
        line-height: 1.5467rem;     
        background: rgba(104,103,115,.1);
        color: #686773;        
        font-size: .64rem;           
        text-align: center; 
        border-radius: .7467rem;        
        display: inline-block;
        line-height: 1.5467rem;
    }
    .all{
        width: 2.9867rem;      
    }
    .interested{
        width: 3.9467rem;
    }
    .active{
        color: #822AFD;
        background-color: rgba(130,42,253,.1);
    }
}
.content{    
    >div{
        padding: .64rem 0;        
        &:first-of-type{
            margin-top: 0;
        }
    }
    .con-info{
        display: flex;
        img{
            width: 2.1333rem;
            height: 2.1333rem;
            border-radius: 50%;
        }
        .info{
            margin-left: .4267rem;
            .name{
                color: #383838;
                font-size: .8533rem;
                height: 1.1733rem;
                line-height: 1.1733rem;
            }
            .mark{
                display: flex;
                align-items: center;
                height: .9067rem;
                line-height: .9067rem;
                img{
                    width: .8rem;
                    height: .8rem;
                    &:last-of-type{
                        margin-left: .32rem;
                    }
                }
                span{
                    font-size: .64rem;
                    color: #808080;
                }
            }
           
        }
    }
    .con-center{
        margin: .4267rem 0;
        color: #383838;
        font-size: .8533rem;
        line-height:1.1733rem;
    }
    .con-img{
        margin-bottom: .4267rem;
        img{
            width: 9.0667rem;
            height: 9.0667rem;
            border-radius: .2667rem; 
        }
    }
    .img-more{
        // display: flex;        
        img{
            margin-left: .4267rem;
            &:first-of-type,&:nth-of-type(4){
                margin-left: 0;
            }
        }        
    }
    .img2{        
        img{
            width: 8.9067rem;
            height: 8.9067rem;
        }
    }
    .img3{        
        img{
            width: 5.8133rem;
            height: 5.8133rem;
        }
    }
    .img4{      
        img{
            vertical-align: bottom;
            width: 5.8133rem;
            height: 5.8133rem;  
            margin-top: .4267rem;          
            &:nth-of-type(3){
                margin-left: 0;                
            }
            &:nth-of-type(4){
                margin-left: .4267rem;                
            }
            &:nth-of-type(even){
                margin-right: 6.1333rem;                
            }
            
        }
    }
    .con-btm{
        .time{
            color: #808080; 
            font-size: .5867rem; 
            height: .8533rem;
            line-height: .8533rem;
        }
        .bottom{
            margin-top: .64rem;
            display: flex;
            align-items: center;
            height: .9067rem;
            line-height: .9067rem;
            font-size: .64rem;
            img{
                width: .9067rem;
                height: .9067rem;
            }
            div{
                flex: 1;
                display: flex;
                align-items: center;
                span{
                    margin-left: .32rem;
                }
                img:last-of-type{
                    margin-left: 1.0667rem;
                }
            }
        }
    }
    .no-more{
        font-size: .7467rem;
        text-align: center;
        color: #808080;
    }
}
.addpost{
    position: fixed;
    right: .8533rem;
    bottom: 4.16rem;
    width: 5.9733rem;
    height: 1.92rem;
    background: #8032FF;
    border-radius: .96rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: .7467rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    img{
        width: .96rem;
        height: .96rem;
        margin-right: .32rem;
    }
}
.mark,.con-center,.con-btm{
    font-family: PingFangSC-Regular, PingFang SC;
}
</style>
