// 动态
<template>
  <div class="containner-posts">
    <div class="top">
        <span>Posts</span>
        <img src="https://img2.baidu.com/it/u=260211041,3935441240&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681405200&t=1225abc639a903c582497356f281b638" alt="">
    </div>
    <div class="sel">
        <div class="btn all" :class="showType?'':'active'" @click="changeType(0)">All</div>
        <div class="btn interested" :class="showType?'active':''" @click="changeType(1)">Interested</div>
    </div>
    <div class="content">
       <div v-for="item in 1" :key="item">
         <div class="con-info">
            <img src="https://img2.baidu.com/it/u=2421090168,324781765&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="">
            <div class="info">
                <div class="name">Peach Claire</div>
                <div class="mark">
                    <img src="@/assets/images/discover/attestation.png" alt="">
                    <span>Miss World 2019 No.3</span>
                    <img src="@/assets/images/discover/terrace.png" alt="">
                    <span>154.3K Fans</span>
                </div>
            </div>
        </div>
        <div class="con-center">
            The fool has his heart on his tongue,the wise man keeps his heart 
        </div>
        <div class="con-img">
            <img src="https://img2.baidu.com/it/u=3963450029,593837318&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="">
        </div>
        <div class="con-btm">
            <div class="time">4 days ago｜UK</div>
            <div class="bottom">
                <div>
                    <img src="@/assets/images/posts/like.png" alt="">
                    <span>123</span>
                    <img src="@/assets/images/posts/comment.png" alt="">
                    <span>45</span>
                </div>
                <img src="@/assets/images/posts/more.png" alt="">
            </div>
        </div>
       </div>
    </div>
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
    }
  },
  components: {

  },
  methods: {
    changeType(type){
        this.showType = type
    },
  }
}
</script>

<style scoped lang="scss">
.containner-posts{
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
    padding: .64rem 0;
    >div{
        margin-top: .64rem;        
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
}
.addpost{
    position: fixed;
    right: .8533rem;
    bottom: .8533rem;
    width: 5.9733rem;
    height: 1.92rem;
    background: #8032FF;
    border-radius: .96rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: .7467rem;
    img{
        width: .96rem;
        height: .96rem;
        margin-right: .32rem;
    }
}
</style>
