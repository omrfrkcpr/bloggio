/* eslint-disable @typescript-eslint/no-explicit-any */
export const shortenText = (text: string, length: number) => {
  if (!text) {
    return "";
  }

  const words = text.split(" ");

  let shortenedText = words.slice(0, length).join(" ");

  if (words.length > length) {
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

export function formatPublish(dateString: string) {
  if (!dateString) {
    return "";
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${month} ${day}`;
}

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

export const formatNum = (num: number) => {
  if (!num) return 0;
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  else if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  else if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  else return num.toString();
};

export const getTrendBlogs = (arr: any) =>
  arr
    ?.slice()
    .sort((a: any, b: any) => b.countOfVisitors - a.countOfVisitors)
    .slice(0, 10);

export const singularize = (text: string) => {
  // blogs => Blog
  return text.charAt(0).toUpperCase() + text.slice(1, -1);
};

// Func for getting categoryName from search query
export function getCapitalizedFilterValue(text: string) {
  const filterIndex = text.indexOf("filter=");
  if (filterIndex === -1) {
    return "";
  }
  const startIndex = filterIndex + "filter=".length;
  let endIndex = text.indexOf(" ", startIndex);
  if (endIndex === -1) {
    endIndex = text.length;
  }

  const word = text.substring(startIndex, endIndex);
  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);

  return capitalizedWord;
}

export function extractProfileId(url: string) {
  const profilePath = "profile/";
  const startIndex = url.indexOf(profilePath) + profilePath.length;
  const endIndex = url.indexOf("/", startIndex);

  if (endIndex === -1) {
    return url.slice(startIndex);
  } else {
    return url.slice(startIndex, endIndex);
  }
}
