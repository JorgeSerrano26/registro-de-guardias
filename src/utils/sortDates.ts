import { UserDate } from "../types";

const sortDates = (items: UserDate[]) => {
    return items.sort((b, a) => new Date(b.date.startDate!).getTime() - new Date(a.date.startDate!).getTime())
}

export default sortDates;