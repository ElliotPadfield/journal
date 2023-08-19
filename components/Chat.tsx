'use client';
import React, { useState } from 'react';

interface Message {
  role: string;
  content: string;
}


import { useRouter } from 'next/navigation';
import EndSaveButton from './EndSaveButton';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types';
import { Json } from '../types';
const Chat = ({ user }: {user: any}) => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "What would you like to talk about? Tell me about your day or what's on your mind?",
    },
  ]);
  const [submitIsEnabled, setSubmitIsEnabled] = useState<boolean>(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const supabase = createClientComponentClient<Database>();
  const handleSave = async () => {
    console.log(`Clicked: ${JSON.stringify(user)}`);
    const { data, error } = await supabase
      .from('chats')
      .insert([{ chat_log: JSON.stringify(chatMessages), user_id: user.id }])
      .select();
    if (!error) {
      return data;
    }
  };

  const handleSend = async () => {
    if (!submitIsEnabled) {
      return;
    }

    const newMessage = { role: 'user', content: inputValue };

    setSubmitIsEnabled(false);
    // Send the updated messages array in the fetch request
    const response = await fetch('/api/generateQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [...chatMessages, newMessage],
      }),
    });
    const { message, error } = await response.json();
    if (error) {
      if (error == 'Demo Ended') {
        router.push('/demo-ended');
      }
    } else {
      setChatMessages((prevMessages) => [...prevMessages, newMessage, message]);
      setInputValue('');
    }
    setSubmitIsEnabled(true);
  };

  return (
    <>
      <div className='rounded-xl border px-10 pb-5 '>
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex  items-start space-x-2 mt-6 ${
              message.role === 'user' ? 'justify-end text-right' : 'text-left'
            }`}
          >
            <div
              className={`py-2 px-3 w-2/3 rounded-xl ${
                message.role === 'user' ? 'bg-blue-300' : 'bg-green-300'
              }`}
            >
              <p className='text-sm text-black'>
                {`${message.role}: ${message.content}`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex rounded border-blue-500 border'>
        <input
          type='text'
          className='flex-grow p-2 border-none rounded'
          placeholder='Enter text here'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className={`py-2 px-4  bg-blue-500 text-white ${
            !submitIsEnabled ? 'opacity-50' : 'hover:bg-blue-700'
          }`}
        >
          Send
        </button>
      </div>
      {(user) ? <EndSaveButton handleSave={() => handleSave()} /> : null}
      
      
    </>
  );
};
export default Chat;
