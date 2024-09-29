const timeUnitsInMilliseconds: Record<string, number> = {
    "second": 1000,
    "minute": 1000 * 60,
    "hour": 1000 * 60 * 60,
    "day": 1000 * 60 * 60 * 24,
    "week": 1000 * 60 * 60 * 24 * 7,
    "year": 1000 * 60 * 60 * 24 * 365
}

export default function getTimePassed(
    datetime: string,
    full: boolean = false
): string {
    const now = new Date();
    const inputDate = new Date(datetime);
    let timeDiff = now.getTime() - inputDate.getTime();

    if (timeDiff < 0) {
        throw new Error("Future date error");
    }

    if (timeDiff < timeUnitsInMilliseconds["second"]) {
        return "now";
    } else if (timeDiff < timeUnitsInMilliseconds["minute"]) {
        const count = Math.round(timeDiff / timeUnitsInMilliseconds["second"]);
        return count + (full ? " second" + (count > 1 && "s") : "s");
    } else if (timeDiff < timeUnitsInMilliseconds["hour"]) {
        const count = Math.round(timeDiff / timeUnitsInMilliseconds["minute"]);
        return count + (full ? " minute" + (count > 1 && "s") : "m");
    } else if (timeDiff < timeUnitsInMilliseconds["day"]) {
        const count = Math.round(timeDiff / timeUnitsInMilliseconds["hour"]);
        return count + (full ? " hour" + (count > 1 && "s") : "h");
    } else if (timeDiff < timeUnitsInMilliseconds["week"]) {
        const count = Math.round(timeDiff / timeUnitsInMilliseconds["day"]);
        return count + (full ? " day" + (count > 1 && "s") : "d");
    } else if (timeDiff < timeUnitsInMilliseconds["year"]) {
        const count = Math.round(timeDiff / timeUnitsInMilliseconds["week"]);
        return count + (full ? " week" + (count > 1 && "s") : "w");
    } else {
        const count = Math.round(timeDiff / timeUnitsInMilliseconds["year"]);
        return count + (full ? " year" + (count > 1 && "s") : "y");
    }
}
