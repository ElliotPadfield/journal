'use client'


const EndSaveButton = ({handleSave}: {handleSave: Function}) => {

  return (
    <button onClick={() => handleSave()} >EndSaveButton </button>

  )
}
export default EndSaveButton