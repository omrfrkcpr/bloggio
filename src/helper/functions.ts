export const shortenText = (text: string) => {
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
