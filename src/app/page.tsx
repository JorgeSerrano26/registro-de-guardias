import DbService from "@/services/DbService"
import AddDevModal from '@/components/AddDevModal';
import { addDPG, addDev, addGuardia } from '@/app/actions/actions';
import ListOfGuardias from '@/components/ListOfGuardias';
import ListOfDPGS from '@/components/ListOfDPGS';
import AddGuardiaModal from '@/components/AddGuardiaModal';
import AddDPGModal from '@/components/AddDPGModal';
import TableResume from '@/components/TableResume';
import generateResume from '@/utils/generateResume';
import ListOfUsers from '@/components/ListOfUsers';
import AppProvider from '@/context/useApp';

export const revalidate = 0

async function fetchData() {
  const [devs, dpgs, guardias] = await Promise.all([DbService.getDevs(), DbService.getDpgs(), DbService.getGuardias()])

  return {
    devs: devs.data,
    dpgs: dpgs.data,
    guardias: guardias.data,
    resume: generateResume({
      guardias: guardias.data,
      dpgs: dpgs.data
    })
  }
}

export default async function Home() {
  const { devs, dpgs, guardias, resume } = await fetchData();

  return (
    <main className='container mx-auto'>
      <AppProvider devs={devs} dpgs={dpgs} guardias={guardias}>
        <div className="flex py-3 px-1 gap-1">
          <AddDevModal action={addDev} />
          <AddGuardiaModal action={addGuardia} />
          <AddDPGModal action={addDPG} />
        </div>

        <div className="grid grid-cols-3 ">
          <ListOfGuardias />
          <ListOfDPGS />
          <ListOfUsers />
        </div>


        <section>
          <h2>Resumen</h2>
          <TableResume resume={resume} />
        </section>
      </AppProvider>

    </main>
  );
}
