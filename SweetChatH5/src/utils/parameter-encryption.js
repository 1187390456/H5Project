import md5 from 'js-md5'
const privateKey = 'TZOTZqpsREJ601tN0Sa9nkD40TFZ6it8'  //加密私钥

//JSON对象字典序列化
const JsonSort = (jsonData) => {
  try {
    // let tempJsonObj = {};
    let str = ''
    let sdic = Object.keys(jsonData).sort();
    sdic.map((item, index)=>{
      if(item == 'sign'){
        return
      }
      if(index > 0)
        str += `&${item}=${jsonData[item]}`
      else
        str += `${item}=${jsonData[item]}`
      // tempJsonObj[item] = jsonData[sdic[index]]
    })
    str += `&privateKey=${privateKey}`  //将排序过后的JSON拼成与后台解析相同的，key=value字符串
    // return tempJsonObj;
    return str
  } catch(e) {
    return jsonData;
  }
}

export const signInit = (jsonData) => {
  return md5(JsonSort(jsonData)).toLowerCase() //用JS-MD5加密并转化成小写直接传给后台
}
