import { GuardiaDBResponse } from "@/types";

const sortDates = (items: GuardiaDBResponse[] | null) => {
    return items?.sort((b, a) => new Date(b.startDate!).getTime() - new Date(a.startDate!).getTime())
}

export default sortDates;