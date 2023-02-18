function findFirstNoneZero(data: {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  let result = { key: "seconds", value: data.seconds };

  Object.keys(data).every((key) => {
    let typeChangedKey = key as "years" | "months" | "days" | "hours" | "minutes" | "seconds";
    const firstNoneZero = data[typeChangedKey];
    if (firstNoneZero !== 0) {
      result = { key, value: firstNoneZero };
      return false;
    }
    return true;
  });

  return result;
}

function calculateTimeAgo(date: string) {
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneMonth = oneDay * 30;
  const oneYear = oneDay * 365;

  let leftTime = new Date().getTime() - new Date(date).getTime();

  const years = Math.floor(leftTime / oneYear);
  leftTime = leftTime % oneYear;

  const months = Math.floor(leftTime / oneMonth);
  leftTime = leftTime % oneMonth;

  const days = Math.floor(leftTime / oneDay);
  leftTime = leftTime % oneDay;

  const hours = Math.floor(leftTime / oneHour);
  leftTime = leftTime % oneHour;

  const minutes = Math.floor(leftTime / oneMinute);
  leftTime = leftTime % oneMinute;

  const seconds = Math.floor(leftTime / oneSecond);

  return { years, months, days, hours, minutes, seconds };
}

export default function timeAgo(date: string) {
  const result = calculateTimeAgo(date);
  const firstNoneZero = findFirstNoneZero(result);
  return { ...result, firstNoneZero };
}
