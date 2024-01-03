'use client';

import { useMemo, useState } from "react";
import Datepicker, { DateRangeType } from "react-tailwindcss-datepicker";
import DevSelector from "./DevSelector";
import { useApp } from "@/context/useApp";

export type Props = {
    action?: (formData: FormData) => void;
}

export const AddGuardiaModal = ({ action }: Props) => {
    const { devs, guardias } = useApp()

    const [date, setDate] = useState<DateRangeType | null>(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const disabledDates = useMemo(() => guardias?.map((d) => ({ startDate: d.startDate, endDate: d.endDate })), [guardias]);

    return (
        <>
            <button onClick={handleOpen} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Agregar guardia
            </button>

            {open && <div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>}

            {open && <div id="crud-modal" role="dialog" tabIndex={-1} aria-hidden={!open} onClick={handleOpen}
                className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div onClick={e => e.stopPropagation()} className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Agregar guardia
                            </h3>
                            <button onClick={handleOpen} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden={!open} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" action={action} onSubmit={() => { handleOpen(); }}>
                            <Datepicker inputName='date' key="guardia-selector" asSingle disabledDates={disabledDates} value={date} onChange={setDate} />
                            <DevSelector users={devs} name='user' />
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add new dev
                            </button>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    );
};
export default AddGuardiaModal;