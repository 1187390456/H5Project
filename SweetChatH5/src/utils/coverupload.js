import { api } from 'api_v2';
import { Message } from 'element-ui';
// import 'blobjs';
function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([ u8arr ], { type: mime });
}

export function coverupload(file) {
	if (!file) return;
	return new Promise((resolve, reject) => {
		api
			.getOssInfo({ fileType: 'png', fileOriName: '封面' })
			.then((res) => {
				if (res.result) {
					var postData = {
						name: 'cover',
						key: res.dir + res.fileName,
						policy: res.policy,
						OSSAccessKeyId: res.accessID,
						host: res.host,
						callback: res.callback,
						signature: res.signature,
						file
					};
					var formData = new FormData();
					formData.append('name', postData.name);
					formData.append('key', postData.key);
					formData.append('policy', postData.policy);
					formData.append('OSSAccessKeyId', postData.OSSAccessKeyId);
					formData.append('success_action_status', 200);
					formData.append('callback', postData.callback);
					formData.append('signature', postData.signature)
					formData.append('file', dataURLtoBlob(file));
					api
						.postOSS(formData)
						.then((res) => {
							if (res.result) {
								resolve(res);
							} else {
								reject();
							}
						})
						.catch(() => {
							reject();
						});
				} else {
					reject();
				}
			})
			.catch((res) => {
				reject();
			});
	});
}
