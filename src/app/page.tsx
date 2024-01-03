import Test from '@/components/Test';
import { DevWithId } from '@/types';
import axios from 'axios';

async function fetchData() {
  const response = await axios.get<DevWithId[]>('http://localhost:3000/api/devs')

  return {
    devs: response.data
  }
}

export default async function Home() {
  const { devs } = await fetchData();


  return (
    <Test devs={devs} />
  );
}
