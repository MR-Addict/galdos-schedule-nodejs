export default async function serverChan(title: string, desp: string) {
  const SERVER_CHAN_KEY = process.env.SERVER_CHAN_KEY;
  if (!SERVER_CHAN_KEY) throw new Error("Please add server chan key to env");

  try {
    const res = await fetch(`https://sc.ftqq.com/${SERVER_CHAN_KEY}.send`, {
      method: "POST",
      body: new URLSearchParams({ title, desp: desp.replace(/\n/g, "\n\n") }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (res.ok) return true;
    else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
