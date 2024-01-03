import { useMemo } from "react";
import { DevDate } from "@/types";
import sortDates from "@/utils/sortDates";

type Props = {
    dates: DevDate[]
}

const ListOfDates = ({ dates }: Props) => {
    const sortedDates = useMemo(() => sortDates(dates), [dates]);

    return <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
        {sortedDates.map((date) => {
            return <li key={`${Date.now()}-${date.date.startDate?.toString()}`} className="flex items-center space-x-3 rtl:space-x-reverse">
                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                </svg>
                <span>
                    <span className="font-semibold text-gray-900 dark:text-white">{date.user.name}</span>
                    -
                    <span className="font-semibold text-gray-900 dark:text-white">{new Intl.DateTimeFormat('es-AR').format(new Date(date.date.startDate!))}</span>
                </span>
            </li>
        })}
    </ul>

}

export default ListOfDates;