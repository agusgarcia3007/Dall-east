import { useRef } from 'react'

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  onKeyDown,
  ref
}) => {
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.select()
  }
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-900 '>
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'>
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        ref={inputRef}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        onClick={handleClick}
        required
        className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg border focus:ring-[#6469ff] focus:ring-2 focus:border-[#4649ff] outline-none block w-full p-3'
      />
    </div>
  )
}

export default FormField
