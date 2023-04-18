<template>
  <div class="container-mine">
    <div class="info">
        <img class="avatar" src="https://img0.baidu.com/it/u=1993557595,4075530522&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1681923600&t=9b6dddbe05c446e1ace6f480f70ef88c" alt="">
        <div class="info-detail">
            <div class="name">Taylor Swift</div>
            <div class="gender">
                <img src="@/assets/images/mine/male.png" alt=""><span>23</span>
            </div>
            <span>ID： 485904843</span>
        </div>
        <img class="right" src="@/assets/images/mine/right.png" alt="">
    </div>
    <div class="income">
        <img class="income-bg" src="@/assets/images/mine/income-bg.png" alt="">
        <div>
            <div class="one">
                <div>
                    <span>Current Income</span>
                    <img class="icon" src="@/assets/images/mine/money.png" alt="">
                </div>
                <div>Yesterday</div>
            </div>
            <div class="two">
                <div>
                    <span>40000</span>
                    <img class="icon" src="@/assets/images/mine/income-right.png" alt="">
                </div>
                <div>+5000</div>
            </div>
            <van-divider class="divider" />
            <div class="three">                
                <div>Potential Income</div>
                <div>
                    <span>30000</span>
                    <img src="@/assets/images/mine/income-right.png" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="share"></div>
    <div class="settings"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.container-mine{
    object-fit: over;
    padding: 0 12px;
    .info{
        display: flex;
        align-items: center;
        margin-top: 30px;
        .avatar{
            width: 68px;
            height: 68px;
            border-radius: 50%;
        }
        .info-detail{
            flex: 1;
            margin-left: 12px;
            .name {
                font-size: 17px;                
                color: #111118;
                height: 24px;
                line-height: 24px;
            }
            .gender{
                margin: 4px 0;
                width: 36px;
                height: 16px;
                background: #FF77B5;
                border-radius: 10px;
                font-size: 10px;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content:center;
                img{
                    width: 12px;
                    height: 12px;
                }
                span{
                    width: 12px;
                    height: 14px;
                    line-height: 14px;
                }
            }
            span{
                font-family: PingFangSC-Regular, PingFang SC;
                color: #9A9A9A;
                font-size: 12px;
                height: 17px;
                line-height: 17px;
            }            
        }
        .right{
            width: 24px;
            height: 24px;
        }
    }
    .income{
        position: relative;
        margin-top: 20px;        
        height: 143px;
        .icon{
            width: 20px;
            height: 20px;
        }
        .income-bg{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }
        >div{            
            padding: 16px 0 12px 0;
            color: #fff;           
            font-size: 14px;   
            .one,.two,.three{
                display: flex;
                align-items: center;
                justify-content:space-between; 
                >div{
                    padding: 0 16px;
                    display: flex;
                    align-items: center;
                    height: 20px;
                    line-height: 20px;
                }
            }
            .one{            
                font-family: PingFangSC-Regular, PingFang SC;
                img{
                    margin-left: 4px;
                }
                
            }
            .two{
                font-size: 20px;
                margin-top: 8px;
                >div{
                    height: 40px;
                    line-height: 40px;
                }
                img{
                    margin-left: 8px;
                }
            }
            .three{
                >div{
                    &:first-of-type{
                        font-family: PingFangSC-Regular, PingFang SC;
                    }
                }
                img {
                    width: 12px;
                    height: 12px;
                    margin-left: 6px;
                }
            }
        }
        .divider{
            margin: 14px 0 12px 0;
        }
    }
}
.font1{
    font-family: PingFangSC-Regular, PingFang SC;
}
       
</style>
