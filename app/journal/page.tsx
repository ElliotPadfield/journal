import { Database } from '@/lib/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ChatList from './ChatList';
import EmptyChats from './EmptyChats';
import Header from '@/components/Header';

const Page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: chats, error } = await supabase.from('chats').select('*');

  return (
    <div>
      <Header />
      <div className='divide-y max-w-4xl -mt-24 px-10 py-10 mx-auto divide-gray-100 overflow-hidden bg-gray-50 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl flex flex-col space-y-8'>
        <h1 className='text-2xl font-semibold text-gray-800'>
          My Journal Entries
        </h1>
        {chats && chats.length > 0 ? (
          <ChatList chats={chats} />
        ) : (
          <EmptyChats />
        )}
      </div>
    </div>
  );
};
export default Page;
