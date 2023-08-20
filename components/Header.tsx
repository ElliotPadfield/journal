import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import HeaderDisclosure from './HeaderDisclosure';
import { Database } from '@/lib/types';

const Header = async () => {
  const supabase = createServerComponentClient({cookies})
  const {data, error} = await supabase.auth.getSession()
  const session = data.session
  return (
    <div className='bg-teal-500 pb-32'>
      <HeaderDisclosure session={session} />
      {/*           <header className='py-10'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-white'>
          Dashboard
        </h1>
      </div>
    </header> */}
    </div>
  );
};
export default Header;
