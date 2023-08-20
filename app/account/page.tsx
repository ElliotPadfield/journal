import Header from '@/components/Header';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const AccountPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error();
  }
  const user = data!.session!.user!;
  return (
    <div>
      <Header />
      <div className='max-w-4xl -mt-24 px-10 py-10 mx-auto bg-gray-50 rounded-md shadow-sm overflow-hidden'>
        <p>{`User ID: ${user.id}`}</p>
        <p>{`User Email: ${user.email}`}</p>
        
      </div>
    </div>
  );
};
export default AccountPage;
