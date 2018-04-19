const Filter = {
  formatDate: (date) => {
    date = date instanceof Date ? date : new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

// 格式化 补零
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

export default Filter;

