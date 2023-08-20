import { Chats } from '@/lib/types';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import dayjs from 'dayjs';

const ChatList = ({ chats }: { chats: Chats[] }) => {
  return (
    <div className='divide-y'>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className='relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6'
        >
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  Topic
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{dayjs(chat.created_at).format('ddd DD MMMM YYYY')}</p>

            </div>
            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatList;
