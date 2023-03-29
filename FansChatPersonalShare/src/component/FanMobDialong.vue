<template>
    <div class="Container">
        <div class="mask"></div>
        <div class="content">
            <img class="closeImg" src="../assets/img/close.png" alt="" @click="$emit('CloseEvent')">
            <div class="flex_content">
                <img class="c1" src="../assets/img/fans.png" alt="">
                <div class="c2">{{ gender == '1' ? $t('pp11') : $t('pp11_1') }}</div>
                <div class="c3">{{ gender == '1' ? $t('pp12') : $t('pp12_1') }}</div>
                <div class="c4" @click="$emit('OnClickEvent')">{{ IsiOS ? $t('pp14') : $t('pp14_1') }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { isiOS } from '../utils/tools'
export default {
    props: {
        gender: {
            default: '',
            type: String
        }
    },
    computed: {
        IsiOS() {
            return isiOS();
        }
    }
}
</script>

<style lang="less" scoped>
.Container {
    position: absolute;
    top: 0;
    width: 375px;
    height: 100vh;

    .mask {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;

        background: #000000;
        opacity: 0.8;
        z-index: 999;
    }

    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 14.05rem;
        height: 17.8rem;
        background: #FFFFFF;
        border-radius: 0.3rem;


        z-index: 999;


        .closeImg {
            width: 1.2rem;
            height: 1.2rem;
            position: absolute;
            top: -30px;
            right: -3px;
        }

        .flex_content {
            display: flex;
            flex-direction: column;
            align-items: center;


            .c1 {
                width: 7.5rem;
                height: 7.5rem;
                margin-top: 1rem;
            }

            .c2 {
                font-size: 1.1rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #8032FF;
                line-height: 1.5rem;
                margin-top: 0.2rem;
            }

            .c3 {
                font-size: 13px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #8F8F8F;
                line-height: 18px;
                margin-top: 0.7rem;
                width: 10.2rem;
                text-align: center;
            }

            .c4 {
                width: 9.7rem;
                height: 2.35rem;
                background: #8032FF;
                border-radius: 1.2rem;
                margin-top: 1.2rem;
                text-align: center;
                line-height: 2.35rem;

                font-size: 0.75rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
            }
        }
    }

}
</style>