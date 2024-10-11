<template>
  <div>
    <input type="file" @change="handleChange" />
  </div>
</template>
<script setup>
const handleChange = (e) => {
  const file = e.currentTarget.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("warn", "警告");
  formData.append("desc", "简介");

  const res = $fetch("/api/upload", {
    method: "post",
    body: formData,
  });
};
</script>
