<template>
    <div class="Container">
        <div class="mask"></div>
        <div class="content">
            <img class="closeImg" src="../assets/img/close.png" alt="" @click="$emit('CloseEvent')">
            <div class="flex_content">
                <img class="c1" src="../assets/img/editor.png" alt="">
                <div class="c2">Download App</div>
                <div class="c3">Scan the QR code below to download the SweetFans App</div>
                <vue-qr class="c4" :logoSrc="imageUrl" :text="url" :size="200"></vue-qr>
            </div>
        </div>

    </div>
</template>

<script>
import vueQr from 'vue-qr'
export default {
    props: {
        url: {
            default: '',
            type: String
        }
    },
    components: { vueQr },
    data() {
        return {
            imageUrl: require('../assets/img/downLoad/logo.png')
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
        height: 23.5rem;
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
                height: 4.65rem;

                margin-top: 2.7rem;
            }

            .c2 {
                font-size: 1.1rem;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #000000;
                line-height: 1.5rem;
                width: 100%;
                text-align: center;

                margin-top: 1.25rem;
            }

            .c3 {
                font-size: 0.65rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #8F8F8F;
                line-height: 0.9rem;
                margin-top: 0.8rem;
                width: 10.1rem;
                text-align: center;
            }

            .c4 {
                width: 160px;
                height: 160px;

                margin-top: 1rem;
            }
        }
    }

}
</style>