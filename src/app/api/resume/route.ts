import { Resume, DevDateWithId, DevDate } from "@/types";

const guardias: DevDate[] = [];
const dpgsDB: DevDateWithId[] = []

const dpgs: Record<string, number> = dpgsDB.reduce<Record<string, number>>((acc, curr) => {
    if (acc[curr.user.id]) {
        acc[curr.user.id] += 1
    } else {
        acc[curr.user.id] = 1
    }

    return acc;
}, {})

const resume = guardias.reduce((acc, curr) => {
    if (acc[curr.user.id]) {
        acc[curr.user.id].total += 1
        acc[curr.user.id].carryOver = acc[curr.user.id].total - (MIN_DAYS_DPG * acc[curr.user.id].dpgs);
        acc[curr.user.id].availableDpgs = Math.floor(acc[curr.user.id].total / MIN_DAYS_DPG - acc[curr.user.id].dpgs);
    } else {
        acc[curr.user.id] = {
            user: curr.user,
            dpgs: dpgs[curr.user.id] ?? 0,
            total: 1,
            availableDpgs: 0,
            carryOver: 1
        }
    }

    return acc;
}, {} as Resume)