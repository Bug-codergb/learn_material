<template>
  <div>
    <div class="header-controller">
      <div>上传进度{{ progress }}%</div>
      <input type="file" @change="handleFileUpload" />
    </div>
  </div>
</template>
<script lang="jsx" setup name="File">
import {
  getFileHash,
  sliceFile,
  checkFileMd5,
  uploadFile,
} from "@/utils/shared";
import { CHUNK_SIZE } from "@/constant";
import { ref } from "vue";
import axios from "axios";
const progress = ref(0);

let count = 0;
let promiseList = [];
// 当用户选择文件后，开始上传
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const ret = await getFileHash(file);//获取文件的hash值
  console.log(ret);
  const md5Value = ret.HASH;
  const fileChunks = sliceFile(file);
  const {
    isUpload,
    chunkStatusList,
    isMerged = false,
  } = await checkFileMd5(md5Value);
  if (!isUpload) {
    const hasEmptyChunk = chunkStatusList.filter((item) => item === 0);
    if (isMerged || hasEmptyChunk.length === 0) {
      console.log("上传成功");
      progress.value = 100;
      return;
    } else {
      count = fileChunks.length - hasEmptyChunk.length;
      chunkStatusList.forEach((item, index) => {
        if (chunkStatusList[index] !== 1) {

          let promise = uploadFile(
              fileChunks.length,
              CHUNK_SIZE,
              index,
              md5Value,
              new File([fileChunks[index].fileChunk], fileChunks[index].fileName),
              () => {
                count += 1;
                progress.value = (count / fileChunks.length) * 100;
              }
          );
          promiseList.push(promise);
        }
      });
    }
  } else {
    for (let i = 0; i < fileChunks.length; i++) {
      let item = fileChunks[i];
      let promise = uploadFile(
          fileChunks.length,
          CHUNK_SIZE,
          i,
          md5Value,
          new File([item.fileChunk], item.fileName),
          () => {
            count += 1;
            progress.value = (count / fileChunks.length) * 100;
          }
      );
      promiseList.push(promise);
    }
  }


  Promise.all(promiseList).then((res) => {
    axios({
      url: '/api/file/merge',
      method: 'post',
      data: {
        md5:md5Value,
        totalNumber:fileChunks.length
      }
    }).then((res) => {
      console.log("文件上传完成")
    })
  })
  return;
};
</script>
