import { log } from "@/lib/mongodb";
import { sendEmail } from "@/lib/report";

async function fetchWeather() {
  const OPENWEATHER_APIKEY = process.env.OPENWEATHER_APIKEY;
  const openweather_url = `https://api.openweathermap.org/data/2.5/weather?q=nanjing&units=metric&appid=${OPENWEATHER_APIKEY}`;
  if (!OPENWEATHER_APIKEY) throw new Error("Please add glados cookie to env");

  try {
    const result = await fetch(openweather_url).then((res) => res.json());
    const weather = result.weather[0].main.toLowerCase();
    const temperature = result.main.temp;
    const humidity = result.main.humidity;

    return { status: true, message: `Today's weather in nanjing is ${weather}, ${temperature}°C, ${humidity}%.` };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Something went wrong while tick a new day!" };
  }
}

export default async function tick(report: "fail" | "success" | "both" = "fail") {
  const result = await fetchWeather();

  console.log(result.message);
  log.insert("tick", { date: new Date().toISOString(), message: result.message });

  if (report === "both" || (report === "success" && result.status) || (report === "fail" && !result.status)) {
    sendEmail({ to: "MR-Addict@qq.com", subject: "Glados Checkin", text: result.message });
  }
}
