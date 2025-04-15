import SparkMD5 from "spark-md5";
import { CHUNK_SIZE } from "@/constant/index";
import axios from "axios";

export function getFileHash(file) {
    const spark = new SparkMD5.ArrayBuffer();
    let worker = new Worker(new URL("../workers/index.js", import.meta.url));
    worker.postMessage({
        file,
    })
    return new Promise((resolve, reject) => {
        worker.onmessage = function (e) {
            resolve(e.data);
        }
    });
}
export function sliceFile(file) {
    const chunks = [];
    let start = 0;
    let end;
    while (start < file.size) {
        end = Math.min(start + CHUNK_SIZE, file.size);
        chunks.push({
            fileChunk: file.slice(start, end),
            fileName: file.name,
        });
        start = end;
    }
    return chunks;
}

export async function checkFileMd5(md5) {
    try {
        const result = await axios({
            url: "/api/file/check",
            method: "post",
            data: {
                md5,
            },
        });

        if (result.status === 200) {
            if (result.data.isMerged) {
                return {
                    isUpload: false,
                    chunkStatusList: [],
                    isMerged: true,
                };
            }
            if (result.data.data.length === 0) {
                return {
                    isUpload: true,
                };
            }

            let firstFile = "";
            let totalChunkLen = 0;
            const fileList = result.data.data;
            const chunkIndexList = [];
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                if (i === 0) {
                    firstFile = fileList[0];
                    totalChunkLen = firstFile.split("-") ? firstFile.split("-")[2] : 0;
                }
                let fileIndex = file.split("-") ? file.split("-")[1] : -1;
                chunkIndexList.push(fileIndex);
            }

            let chunkStatusList = new Array(Number(totalChunkLen)).fill(0);

            chunkIndexList.forEach((item, index) => {
                chunkStatusList[item] = 1;
            });
            return {
                isUpload: false,
                chunkStatusList,
            };
        }
    } catch (e) {
        throw new Error("获取文件错误");
    }
}
export function uploadFile(
    totalNumber,
    chunkSize,
    chunkIndex,
    fileHash,
    file,
    cb
) {
    let formData = new FormData();
    formData.append("totalNumber", totalNumber);
    formData.append("chunkSize", chunkSize);
    formData.append("chunkIndex", chunkIndex);
    formData.append("fileHash", fileHash);
    formData.append("file", file);

    return axios({
        url: "/api/file/upload",
        method: "post",
        data: formData,
        headers: {
            "Content-type": "multipart/form-data",
        },
    })
}
