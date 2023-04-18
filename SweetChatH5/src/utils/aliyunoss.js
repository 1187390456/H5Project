import { getSts } from "@/api_v2/modules/login.js";
import { Message } from "element-ui";
import OSS from "ali-oss";
import store from "@/store";
var ossClient;
var stsInfo;
// 初始化
export const initOss = () => {
  return new Promise((resolve, reject) => {
    getSts().then((res) => {
      if (res.result) {
        stsInfo = res.data;
        ossClient = new OSS({
          accessKeyId: stsInfo.accessKeyID,
          accessKeySecret: stsInfo.accessKeySecret,
          stsToken: stsInfo.securityToken,
          refreshSTSToken: () => {
            getSTS().then((info) => {
              return {
                accessKeyId: info.accessKeyId,
                accessKeySecret: info.accessKeySecret,
                stsToken: info.stsToken,
              };
            });
          },
          refreshSTSTokenInterval: 300000,
          bucket: stsInfo.bucket,
          endpoint: stsInfo.endpoint,
        });
        resolve(true);
      } else {
        Message.error(res.errorMsg);
        reject(true);
      }
    });
  });
};

/**
 * oss上传
 * @param {File} file  文件
 * @param {Number} fileType  文件类型  图片:1 音频:2 视频:3
 * @param {String} fileSort  文件分类 头像相关:avatar 动态:dynamic
 * @param {Number} videoCoverID  视频封面id  非视频文件可不传
 * @param {Float} videoTimeLen  视频长度  非视频文件可不传
 */
export const ossUpload = async (
  file,
  { fileType, fileSort, videoCoverID, videoTimeLen }
) => {
  videoCoverID = videoCoverID ? videoCoverID : 0;
  videoTimeLen = videoTimeLen ? videoTimeLen : 0;
  const { loginInfo, baseURL } = store.getters;
  let newImgName = `H5_${loginInfo.userInfo.id}_${Math.ceil(
    Math.random() * 100000
  )}_${new Date().getTime()}.${file.type.split("/")[1]}`;
  var imageBody = "";
  if (fileType == 1) {
    imageBody =
      "," +
      '"imageInfo.height":${imageInfo.height}' +
      "," +
      '"imageInfo.width":${imageInfo.width}' +
      "," +
      '"imageInfo.format":${imageInfo.format}';
  }
  let tempBody =
    '{"userID":"' +
    loginInfo.userInfo.id +
    '",' +
    '"userKey":"' +
    loginInfo.userInfo.token +
    '",' +
    '"osType":"H5"' +
    "," +
    '"fileName":"' +
    newImgName +
    '",' +
    '"fileType":"' +
    fileType +
    '",' +
    '"fileSize":"' +
    file.size +
    '",' +
    '"fileIntentType":"' +
    "" +
    '",' +
    '"voiceTimeLen":"' +
    0 +
    '",' +
    '"videoCoverID":"' +
    videoCoverID +
    '",' +
    '"videoTimeLen":"' +
    videoTimeLen +
    '",' +
    '"isCheck":"' +
    0 +
    '",' +
    '"bucket":${bucket}' +
    "," +
    '"object":${object}' +
    "," +
    '"etag":${etag}' +
    "," +
    '"size":${size}' +
    imageBody +
    "}";
  console.log(tempBody, "+++++++++++++++++++");

  const options = {
    callback: {
      url: baseURL + "/api/oss/callback",
      body: tempBody,
      contentType: "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    ossClient
      .put(
        `${fileType == 1 ? "image" : "video"}/${fileSort}/${newImgName}`,
        file,
        options
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err, "oss上传--err======");
      });
  });
};
