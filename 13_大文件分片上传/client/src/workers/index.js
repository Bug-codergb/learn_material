self.importScripts('/spark-md5.js')
self.onmessage = function (e) {
    const { file } = e.data;
    const spark = new self.SparkMD5.ArrayBuffer()
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
        if (e.target) {
            const buffer = e.target.result;
            if (buffer) {
                spark.append(buffer);
                let HASH = spark.end();
                postMessage({
                    buffer,
                    HASH,
                })
            }
        }
    };
}