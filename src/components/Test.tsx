"use client";

import { useEffect, useMemo, useState } from 'react'
import Datepicker, { DateValueType, DateRangeType } from "react-tailwindcss-datepicker";
import DevSelector from '@/components/UserSelector/UserSelector';
import { Resume, Dev, DevWithId, DevDate } from '@/types';
import Button from '@/components/Button';
import ListOfDates from '@/components/ListOfDates';
import TableResume from '@/components/TableResume';

export default function Test({ devs }: { devs: DevWithId[] }) {

    const [value, setValue] = useState<DateRangeType | null>(null);
    const [Dev, setDev] = useState<DevWithId>();
    const [Devs, setDevs] = useState<DevWithId[]>(devs);
    const [dates, setDates] = useState<DevDate[]>([]);
    const [resume, setResume] = useState<Resume>();
    const [dpgDev, setDPGDev] = useState<DevWithId>();
    const [dpgDate, setDpgDate] = useState<DateRangeType | null>(null);

    const disabledDates = useMemo(() => dates.map((d) => d.date), [dates]);

    useEffect(() => {
        async function getData() {
            /*const Devs = await DevService.find()
            const guardias = await DateService.getAll()
            setDevs(Devs)
            setDates(guardias)
            setResume(await DateService.getResume())*/
        }
        getData()
    }, [])




    const handleValueChange = (newValue: DateValueType) => setValue(newValue as DateRangeType);
    const handleOnSelect = (Dev?: DevWithId) => setDev(Dev);

    const handleSubmit = async () => {
        if (Dev && value) {
            //await DateService.register({ Dev, date: value })
            setDev(() => undefined)
            setValue(() => null)
        }
    }

    const handleDPG = async () => {
        if (dpgDev && dpgDate) {
            //await DateService.addDPG({ Dev: dpgDev, date: dpgDate })
            setDPGDev(undefined)
            setDpgDate(null)
        }
    }

    return (
        <div>
            <section>
                <h2>Agregar guardia</h2>
                <Datepicker key="guardia-selector" value={value} onChange={handleValueChange} asSingle disabledDates={disabledDates} />
                <DevSelector value={Dev} users={Devs} onSelect={handleOnSelect} />
                <Button onClick={handleSubmit}>Add</Button>
            </section>
            <ListOfDates dates={dates} />
            <section>
                <h2>Agregar DPG</h2>
                <Datepicker value={dpgDate} onChange={(newValue) => setDpgDate(newValue)} asSingle />
                <DevSelector value={dpgDev} users={Devs} onSelect={(Dev?: DevWithId) => setDPGDev(Dev)} />
                <Button onClick={handleDPG}>Add dpg</Button>
            </section>
            <section>
                <h2>Resumen</h2>
                <TableResume resume={resume} />
            </section>
        </div>
    );
}
