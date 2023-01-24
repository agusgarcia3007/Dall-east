export const generateImage = async (setGeneratingImg, form, setForm) => {
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
