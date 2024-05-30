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

export const calculateReadTime = (desc: any): number => {
  const averageReading = 150;

  if (!desc) {
    return 0;
  }

  const div = document.createElement("div");
  div.innerHTML = typeof desc === "string" ? desc : desc._html || "";

  const textContent = div.textContent || "";
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

export const formatNum = (num: number) => {
  if (!num) return 0;
  if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
  else if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  else if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  else return num.toString();
};

export const getCategoryName = (
  categoryId: string,
  categories: any
): string => {
  const category = categories.find((cat: any) => cat?._id === categoryId);
  return category ? category?.name : "";
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

export const findCategoryName = (array: Array<string>, id: string) => {
  const category = array.find((cat: any) => cat?._id === id) as
    | { name: string }
    | undefined;
  return category ? category?.name : "";
};

export const findCategoryId = (array: Array<string>, categoryName: string) => {
  const category = array.find((cat: any) => cat?.name === categoryName) as
    | { _id: string }
    | undefined;
  return category ? category?._id : "";
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
