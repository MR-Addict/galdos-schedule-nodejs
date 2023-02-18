export default async function checkin() {
  const GLADOS_COOKIE = process.env.GLADOS_COOKIE;
  const checkinURL = "https://glados.rocks/api/user/checkin";
  if (!GLADOS_COOKIE) throw new Error("Please add glados cookie to env");

  try {
    const res = await fetch(checkinURL, {
      method: "POST",
      body: JSON.stringify({ token: "glados.network" }),
      headers: { Cookie: GLADOS_COOKIE, "Content-Type": "application/json" },
    });
    if (!res.ok) return { status: false, message: "Something went wrong while checkin!" };

    const result = await res.json();
    if (result.code !== 0 && result.code !== 1) return { status: false, message: "Checkin failed!" };

    const leftDays = parseInt(result.list[0].balance);
    const message = `You got ${leftDays} days left.`;

    return { status: true, message };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Something went wrong while checkin!" };
  }
}
