import Vue from "vue";

Vue.filter("formatDate", function(value, moment, formatTemplate) {
  if (!value) return "";

  if (value !== "Closed") {
    return moment(value).format(formatTemplate);
  } else {
    return value;
  }
});
