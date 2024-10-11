import { readFormData } from "h3"
export default defineEventHandler(async event => {
  const body: any = await readFormData(event);
  try {
    const res = await $fetch("http://localhost:8888/file/upload", {
      method: "post",
      body,
      /*headers: {
        "Content-type":"multipart/form-data"
      }*/
    });  
  } catch (e) {
  }
  return {};
});  