export default function formatDate(date: string) {
  const newDate = new Date(date);
  const localDate = newDate.toLocaleString("zh-cn", { timeZone: "Asia/Shanghai" });

  const [dateSplit, timeSplit] = localDate.split(" ");
  const dateString = dateSplit
    .split("/")
    .map((item) => (Number(item) < 10 ? "0" + Number(item) : item))
    .join("-");
  const result = dateString + " " + timeSplit;

  return result;
}
