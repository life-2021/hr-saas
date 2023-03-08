<template>
  <div>
    <upload-excel :on-success="success"></upload-excel>
  </div>
</template>

<script>
import UploadExcel from "@/components/UploadExcel";
import { importEmployee } from "@/api/employees";
export default {
  components: {
    UploadExcel,
  },
  methods: {
    async success({ header, results }) {
      console.log(results);
      const headerDate = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
      };
      let list = results.map((item) => {
        let info = {};
        Object.keys(item).forEach((key) => {
          if (
            headerDate[key] == "timeOfEntry" ||
            headerDate[key] == "correctionTime"
          ) {
            info[headerDate[key]] = this.formatDate(item[key], "/");
          } else {
            info[headerDate[key]] = item[[key]];
          }
        });
        console.log(info);
        return info;
      });
      await importEmployee(list);
    },
    // 转化excel的日期格式
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
};
</script>

<style>
</style>