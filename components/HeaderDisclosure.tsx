'use client';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Chat', href: '/', current: true },
  { name: 'My Journals', href: '/journal', current: false },
  { name: 'Account', href: '/account', current: false}
];

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ');
}
const HeaderDisclosure = ({ session}: { session: Session | null}) => {
  const supabase = createClientComponentClient();
  const pathname = usePathname()

  return (
    <Disclosure
      as='nav'
      className='border-b border-teal-300 border-opacity-25 bg-teal-500 lg:border-none'
    >
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between lg:border-b lg:border-teal-400 lg:border-opacity-25'>
              <div className='flex items-center px-2 lg:px-0'>
                <div className='flex-shrink-0'>
                  <Link href='/'>
                    <Image
                      className='block h-8 w-8'
                      src='https://tailwindui.com/img/logos/mark.svg?color=teal&shade=300'
                      alt='Your Company'
                      height={600}
                      width={600}
                    />
                  </Link>
                </div>
                <div className='hidden lg:ml-10 lg:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          (pathname == item.href)
                            ? 'bg-teal-700 text-white'
                            : 'text-white hover:bg-teal-500 hover:bg-opacity-75',
                          'rounded-md py-2 px-3 text-sm font-medium'
                        )}
                        aria-current={(pathname == item.href) ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex lg:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md bg-teal-600 p-2 text-teal-200 hover:bg-teal-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div>
                {session ? (
                  <>
                    <span className='text-white font-medium'>
                      {session.user.email}{' '}
                      <button
                        onClick={() => supabase.auth.signOut()}
                        className='hover:text-lime-300 hover:underline'
                      >
                        (Sign Out)
                      </button>
                    </span>
                  </>
                ) : (
                  <Link href='/auth'>
                    <button className='rounded bg-blue-500 py-1 px-3 text-gray-50 font-semibold'>
                      Log In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};
export default HeaderDisclosure;
