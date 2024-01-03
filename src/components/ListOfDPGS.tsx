'use client';

import { useMemo } from "react";
import sortDates from "@/utils/sortDates";
import { useApp } from "@/context/useApp";


const ListOfDates = () => {
    const { dpgs } = useApp();
    const sortedDates = useMemo(() => sortDates(dpgs), [dpgs]);

    return <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 ">Lista de DPGS</h3>
        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
            {sortedDates?.map((date) => {
                return <li key={`${date.created_at}-${date.startDate?.toString()}-${date.devs.id}`} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                    <span>
                        <span className="font-semibold text-gray-900 ">{date.devs.name}</span>
                        -
                        <span className="font-semibold text-gray-900 ">{new Intl.DateTimeFormat('es-AR').format(new Date(date.startDate!))}</span>
                    </span>
                </li>
            })}
        </ul>
    </div>

}

export default ListOfDates;