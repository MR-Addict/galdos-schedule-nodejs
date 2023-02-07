import { formatDate } from "@/lib/utils";

export default function pairHeaderExpireDate(headers: Headers) {
  const keys = headers.keys();
  let header = keys.next();
  let expireDate = "";
  while (header.value) {
    if (header.value === "set-cookie") {
      //@ts-expect-error
      expireDate = headers.get(header.value).match(/(?<=expires=).*?(?=;)/)[0];
      break;
    }
    header = keys.next();
  }
  return formatDate(expireDate);
}
