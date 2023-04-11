/**
 * Created by PanJiaChen on 16/11/18.
 */
import { api } from 'api_v2';
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
	const valid_map = [ 'admin', 'editor' ];
	return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * 答疑室设置开始时间
 */
export function validatorNowTime(rule, value, callback) {
	let nowTime = new Date().getTime();
	if (new Date(value).getTime() < nowTime) {
		callback(new Error('答疑的结束时间不能早于当前时间'));
	} else {
		callback();
	}
}

/**
 * 主题标题的验证
 */
function strlen(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		// 单字节加1
		if ((c >= 0x0001 && c <= 0x007e) || (c <= 0xff9f && c >= 0xff60)) {
			len++;
		} else {
			len += 2;
			// len++
		}
	}
	return len;
}
export function validatorTitle(error1 = '不能以纯数字作为主题', error2 = '主题里的特殊符号不能连续重复') {
	return function(rule, value, callback) {
		if (strlen(value) > 40) {
			// if (strlen(value) > 15) {
			callback(new Error('请保持在20字以内'));
			return;
		}

		var reg1 = /^[0-9]*$/;
		if (reg1.test(value)) {
			callback(new Error(error1));
		}

		var reg2 = /^[^a-zA-Z0-9\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00]/;
		if (reg2.test(value)) {
			callback(new Error('开头不能有特殊字符'));
		}

		var reg3 = /[^a-zA-Z0-9\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00]$/;
		if (reg3.test(value)) {
			callback(new Error('结尾不能有特殊字符'));
		}

		var reg4 = /([^a-zA-Z0-9\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\s]){2,}?/;
		if (reg4.test(value)) {
			callback(new Error(error2));
		}

		callback();
	};
}

// 金额输入保留两位小数 返回字符串
export function clearNoNum(s) {
	// 先把非数字的都替换掉，除了数字和.
	s = s.toString();
	// s = s.replace(/e/gi, '') // e
	s = s.replace(/[^\d.]/g, ''); // 必须保证第一个为数字而不是.
	s = s.replace(/^\./g, ''); // 保证只有出现一个.而没有多个.
	s = s.replace(/\.{2,}/g, '.'); // 保证.只出现一次，而不能出现两次以上
	s = s.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.'); // 只能输入两个小数
	s = s.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
	return s;
}

export function filterClientAntispam() {
	return function(rule, value, callback) {
		if (!value) {
			callback(new Error('内容不能为空'));
		} else {
			api
				.greeText({ text: value })
				.then((res) => {
					if (!res.error_code && res.green) {
						callback();
					} else {
						callback(new Error('内容非法！'));
					}
				})
				.catch((res) => {
					callback();
				});
		}
	};
}
