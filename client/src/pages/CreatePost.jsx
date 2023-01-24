import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {}
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const resopnse = await fetch(`${import.meta.env.VITE_API_URL}/dalle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        })
        const data = await resopnse.json()
        console.log('generating image')

        setForm({ ...form, photo: `data:image/png;base64,${data.image}` })
      } catch (error) {
        if (import.meta.env.VITE_API_URL.includes('localhost')) {
          console.log(error)
        }
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter a prompt')
    }
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

      <form className='mt-16 max-w-3xl ' onSubmit={handleSubmit}>
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
                generateImage()
              }
            }}
          />

          <div className='relative mx-auto sm:mx-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
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
            onClick={generateImage}
            className='text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-gray-400'>
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {/* <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div> */}
      </form>
    </section>
  )
}

export default CreatePost
