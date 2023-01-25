import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { generateImage, handleShare } from '../utils/fetchingFunctions'
import { FormField, Loader } from '../components'
import { ToastContainer } from 'react-toastify'

const CreatePost = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    image: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasGeneratedImg, setHasGeneratedImg] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <div>
          <h1 className='font font-extrabold text-[#222328] text-[32px]'>Create</h1>
          <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
            Create imaginative and visually stunning images through DALL-E AI and share them with
            the community
          </p>
        </div>
      </div>

      <form
        className='mt-16 max-w-3xl '
        onSubmit={(e) => handleShare(e, form, setLoading, navigate)}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your name'
            type='text'
            name='name'
            placeholder='John Doe'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder='A photograph of a cyborg exploring Tokyo at night, lomography'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !generatingImg) {
                generateImage(setGeneratingImg, form, setForm, setHasGeneratedImg)
              }
            }}
          />

          <div className='relative mx-auto sm:mx-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-72 p-3 h-72 flex justify-center items-center'>
            {form.image ? (
              <img src={form.image} alt={form.prompt} className='w-full h-full object-contain' />
            ) : (
              <img
                src={preview}
                alt={preview}
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            disabled={generatingImg}
            onClick={() => generateImage(setGeneratingImg, form, setForm, setHasGeneratedImg)}
            className='text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-gray-400'>
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {hasGeneratedImg && (
          <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>Want to share it with the community?</p>
            <button
              type='submit'
              disabled={loading}
              className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-gray-400'>
              {loading ? 'Sharing...' : 'Share'}
            </button>
          </div>
        )}
      </form>

      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </section>
  )
}

export default CreatePost
