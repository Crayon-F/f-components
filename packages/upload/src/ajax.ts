import { options, ElUploadProgressEvent } from "./interface";

const ajax = function (options: options) {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();

  formData.append(options.filename, options.file);

  xhr.open("post", options.action);

  xhr.onload = function () {
    const res = xhr.responseText || xhr.response;

    options.onSuccess(JSON.parse(res));
  };

  // 上传进度
  xhr.upload.onprogress = function (e) {
    if (e.total > 0) {
      (e as ElUploadProgressEvent).percent = (e.loaded / e.total) * 100;
    }
    options.onProgress(e);
  };

  xhr.onerror = function (err: any) {
    options.onError(err);
  };

  xhr.send(formData);
};
export default ajax;
