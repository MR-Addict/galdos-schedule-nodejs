export default async function telegram(text: string, chat_id: string = "1550735576") {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  if (!TELEGRAM_BOT_TOKEN) throw new Error("Please add telegram bot key to env");

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      body: new URLSearchParams({ chat_id, text }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
    if (res.ok) return true;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
