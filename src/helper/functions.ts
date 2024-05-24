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

export const calculateReadTime = (text: string) => {
  if (!text) {
    return 0;
  }

  const wordCount = text.split(/\s+|[,.;!?]+/).length;
  const wordsPerMinute = 225;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  let additionalTime;

  switch (true) {
    case readTime < 1:
      return 1;
    case readTime >= 1 && readTime <= 10:
      return readTime;
    case readTime > 10 && readTime <= 20:
      return Math.ceil(readTime / 2) * 2;
    default:
      additionalTime = Math.ceil((readTime - 20) / 5) * 5;
      return 20 + additionalTime;
  }
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
