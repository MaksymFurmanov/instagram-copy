const timeUnitsInMilliseconds: Record<string, number> = {
    "second": 1000,
    "minute": 1000 * 60,
    "hour": 1000 * 60 * 60,
    "day": 1000 * 60 * 60 * 24,
    "week": 1000 * 60 * 60 * 24 * 7,
    "year": 1000 * 60 * 60 * 24 * 365
}

export default function getTimePassed(datetime: Date): string {
    const now = new Date();
    let timeDiff = now.getTime() - datetime.getTime();

    if (timeDiff > 0) {
        throw new Error("Future date error");
    }
    timeDiff = -timeDiff;

    if (timeDiff < timeUnitsInMilliseconds["second"]) {
        return "now";
    } else if (timeDiff < timeUnitsInMilliseconds["minute"]) {
        return Math.round(timeDiff / timeUnitsInMilliseconds["second"]) + "s";
    } else if (timeDiff < timeUnitsInMilliseconds["hour"]) {
        return Math.round(timeDiff / timeUnitsInMilliseconds["minute"]) + "m";
    } else if (timeDiff < timeUnitsInMilliseconds["day"]) {
        return Math.round(timeDiff / timeUnitsInMilliseconds["hour"]) + "h";
    } else if (timeDiff < timeUnitsInMilliseconds["week"]) {
        return Math.round(timeDiff / timeUnitsInMilliseconds["day"]) + "d";
    } else if (timeDiff < timeUnitsInMilliseconds["year"]) {
        return Math.round(timeDiff / timeUnitsInMilliseconds["week"]) + "w";
    } else {
        return Math.round(timeDiff / timeUnitsInMilliseconds["year"]) + "y";
    }
}
