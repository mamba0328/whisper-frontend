import { DATE_DAYS, DATE_MONTHS } from "../consts/consts";

export const getChatFormatedDate = (timestamp:string) => {
    if (!timestamp) {
        return "No timestamp provided";
    }

    const now = Date.now();
    const dateFromTimestamp = new Date(timestamp);

    const minutes = setPrefixZeroIfNeeded(dateFromTimestamp.getMinutes());
    const hours = setPrefixZeroIfNeeded(dateFromTimestamp.getHours());
    // @ts-ignore
    const day = DATE_DAYS[`${dateFromTimestamp.getDay()}`];
    const date = setPrefixZeroIfNeeded(dateFromTimestamp.getDate());
    // @ts-ignore
    const month = DATE_MONTHS[`${dateFromTimestamp.getMonth()}`];

    const intl = new Intl.DateTimeFormat("en-US"); // MM/DD/YYYY
    const todayInFormat = intl.format(now);
    const timestampInFormat = intl.format(dateFromTimestamp);

    const isToday = todayInFormat === timestampInFormat;
    // remove /DD/, compare month and year
    const isThisMonth = todayInFormat.replace(/\/\d{2}\//, "/") === timestampInFormat.replace(/\/\d{2}\//, "/");
    // remove MM/DD/, compare only year
    const isThisYear = todayInFormat.split("/").at(-1) === timestampInFormat.split("/").at(-1);

    switch (true) {
    case isToday: {
        return `${hours}:${minutes}`;
    }
    case isThisMonth: {
        return `${day} ${date}`;
    }
    case isThisYear: {
        return `${month} ${date}`;
    }
    default: {
        return timestampInFormat;
    }
    }
};

export const getFormatedMessageTime = (timestamp:string) => {
    const dateFromTimestamp = new Date(timestamp);

    const minutes = setPrefixZeroIfNeeded(dateFromTimestamp.getMinutes());
    const hours = setPrefixZeroIfNeeded(dateFromTimestamp.getHours());

    return `${hours}:${minutes}`;
};

const setPrefixZeroIfNeeded = (number:number) => number < 10 ? `0${number}` : number;
