// 动态详情
<template>
  <div class="containner-posts">
    <div class="top">
        <img src="@/assets/return.png" />
        <span>Posts</span>
    </div>
    <div class="content">
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
    <div class="addpost">
        <img src="@/assets/images/posts/white-com.png" alt="">
        <span>评论</span>
    </div>
    <!-- 查看评论 -->
    <div class="check-comment">
        
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  components: {

  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.containner-posts{    
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
}
.content{
    position: relative;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(238,238,238,.7);
    .con-info{
        display: flex;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .info{
            margin-left: 8px;
            .name{
                color: #383838;
                font-size: 16px;
                height: 22px;
                line-height: 22px;
            }
            .mark{
                display: flex;
                align-items: center;
                height: 17px;
                line-height: 17px;
                img{
                    width: 15px;
                    height: 15px;
                    &:last-of-type{
                        margin-left: 6px;
                    }
                }
                span{
                    font-size: 12px;
                    color: #808080;
                }
            }
           
        }
    }
    .con-center{
        margin: 8px 0;
        color: #383838;
        font-size: 16px;
        line-height:22px;
    }
    .con-img{
        margin-bottom: 8px;
        img{
            width: 170px;
            height: 170px;
            border-radius: 5px; 
        }
    }
    .con-btm{
        .time{
            color: #808080; 
            font-size: 11px; 
            height: 16px;
            line-height: 16px;
        }
        .bottom{
            margin-top: 12px;
            display: flex;
            align-items: center;
            height: 17px;
            line-height: 17px;
            font-size: 12px;
            img{
                width: 17px;
                height: 17px;
            }
            div{
                flex: 1;
                display: flex;
                align-items: center;
                span{
                    margin-left: 6px;
                }
                img:last-of-type{
                    margin-left: 20px;
                }
            }
        }
    }
}
.content::after{
    content:"";
    width: 100%;
    height: 5px;
    // position: absolute;
    background: #EEEEEE;
}
.addpost{
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 112px;
    height: 36px;
    background: #8032FF;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    img{
        width: 18px;
        height: 18px;
        margin-right: 6px;
    }
}
.check-comment{

}
</style>
