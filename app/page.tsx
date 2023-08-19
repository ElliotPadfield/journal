import Chat from '@/components/Chat';
import EndSaveButton from '@/components/EndSaveButton';
import Header from '@/components/Header';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();
  const user = data.session?.user;

  return (
    <>
      <div className='min-h-full'>
        <Header />

        <main className='-mt-24 min-h-full'>
          <div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 '>
            <div className='rounded-xl bg-gray-50 px-14 pt-4 pb-16 flex flex-col space-y-10 text-center min-h-full'>
              <div className='flex flex-col max-w-2xl mx-auto'>
                <p className='text-red-500 mt-6 text-xs border rounded-full border-red-500 p-2 bg-red-50 font-semibold mx-auto'>
                  This is an early proof of concept. Inaccurate or dangerous
                  responses may be generated.
                  {JSON.stringify(user)}
                </p>
                <h3 className='text-4xl mt-6 font-semibold text-gray-800'>
                  Welcome to your journal
                </h3>
                <p className='text-gray-600 text-md mt-2'>
                  This is a space for you to share, discuss, explore your
                  thoughts. Our AI will ask questions, help you identify other
                  points of view, challenge &amp; reassure you.
                </p>
              </div>
              <Chat user={user} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
