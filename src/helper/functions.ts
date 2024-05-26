/* eslint-disable @typescript-eslint/no-explicit-any */
export const shortenText = (text: string) => {
  if (!text) {
    return "";
  }

  const words = text.split(" ");

  let shortenedText = words.slice(0, 20).join(" ");

  if (words.length > 20) {
    shortenedText += "...";
  }

  return shortenedText;
};

export const dateFormatter = (dateString: string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = months[monthIndex] + " " + day + ", " + year;
  return formattedDate;
};

export const calculateReadTime = (desc: any) => {
  if (!desc?._html) {
    return 0;
  }

  const averageReading = 225;

  const div = document.createElement("div");
  div.innerHTML = desc._html;

  const textContent = div.textContent || div.innerHTML;
  const words = textContent.trim().split(/\s+/);
  return Math.ceil(words.length / averageReading);
};

export const capitalizeWords = (text: string) => {
  if (!text) {
    return "";
  }

  return text
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

export const maskEmail = (email: string) => {
  if (!email) {
    return "";
  }

  const [localPart, domainPart] = email.split("@");

  if (localPart.length <= 4) {
    return email;
  }

  const start = localPart.slice(0, 2);
  const end = localPart.slice(-2);

  const maskedLocalPart = `${start}***${end}`;

  return `${maskedLocalPart}@${domainPart}`;
};
