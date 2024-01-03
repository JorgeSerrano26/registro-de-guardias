import {
    Resume, GuardiaDBResponse
} from "@/types";
import { MIN_DAYS_DPG } from "@/consts";

type Props = {
    guardias: GuardiaDBResponse[] | null,
    dpgs: GuardiaDBResponse[] | null
}

const generateResume = ({ guardias, dpgs }: Props) => {
    if (!guardias || !dpgs) return null

    const dpgsFinal: Record<string, number> = dpgs.reduce<Record<string, number>>((acc, curr) => {
        if (acc[curr.devs.id]) {
            acc[curr.devs.id] += 1
        } else {
            acc[curr.devs.id] = 1
        }

        return acc;
    }, {})

    const resume = guardias.reduce((acc, curr) => {
        if (acc[curr.devs.id]) {
            acc[curr.devs.id].total += 1
            acc[curr.devs.id].carryOver = 0 //acc[curr.devs.id].total - (MIN_DAYS_DPG * acc[curr.devs.id].dpgs);
            acc[curr.devs.id].availableDpgs = Math.floor(acc[curr.devs.id].total / MIN_DAYS_DPG - acc[curr.devs.id].dpgs);
        } else {
            acc[curr.devs.id] = {
                user: curr.devs,
                dpgs: dpgsFinal[curr.devs.id] ?? 0,
                total: 1,
                availableDpgs: 0,
                carryOver: 1
            }
        }

        return acc;
    }, {} as Resume)

    return resume
}

export default generateResume;