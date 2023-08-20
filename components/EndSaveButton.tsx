'use client';

const EndSaveButton = ({ handleSave }: { handleSave: Function }) => {
  return (
    <button
      className='rounded-md w-fit mx-auto bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      onClick={() => handleSave()}
    >
      End & Save Chat
    </button>
  );
};
export default EndSaveButton;
