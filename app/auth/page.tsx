import Image from 'next/image';
import AuthForm from './auth-form';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import HeaderDisclosure from '@/components/HeaderDisclosure';
const page = async () => {
  const supabase = createServerComponentClient({cookies})
  const {data, error} = await supabase.auth.getSession()
  const session = data.session
  return (
    <>
      <HeaderDisclosure session={session} />
      <div className=' flex flex-col justify-center min-h-full flex-1 bg-gradient-to-r from-sky-500 to-indigo-500'>
        <div className='bg-gray-50 max-w-lg mx-auto rounded-md p-10 '>
          <Image src='/logo.png' width={600} height={300} alt='Logo'/>
          <h1 className='text-3xl font-semibold text-gray-700'>
            Login or Signup
          </h1>
          <div className='mt-10'>
            <AuthForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default page;
