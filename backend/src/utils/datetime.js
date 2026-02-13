const IST_OFFSET_MINUTES = 5.5 * 60; // IST = UTC +5:30


const nowUTC = () => new Date();

const nowIST = () => {
  const date = new Date();
  return new Date(date.getTime() + IST_OFFSET_MINUTES * 60000);
};

const formatDatetime = (dateObj) => {
  if (!dateObj) return null;
  return new Date(dateObj)
    .toISOString()
    .replace("T", " ")
    .split(".")[0];
};

module.exports = {
    nowUTC,
    nowIST,
    formatDatetime,
};