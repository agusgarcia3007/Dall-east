export const generateImage = async (setGeneratingImg, form, setForm, setHasGeneratedImg) => {
  if (form.prompt) {
    setHasGeneratedImg(false)
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

      setForm({ ...form, image: `data:image/png;base64,${data.image}` })
      setHasGeneratedImg(true)
    } catch (error) {
      if (import.meta.env.VITE_API_URL.includes('localhost')) console.log(error)
      // TODO: Add error handling
    } finally {
      setGeneratingImg(false)
    }
  } else {
    alert('Please enter a prompt')
  }
}

export const handleShare = async (e, form, setLoading, navigate) => {
  e.preventDefault()

  if (form.prompt && form.image) {
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      await response.json()
      navigate('/')
    } catch (error) {
      if (import.meta.env.VITE_API_URL.includes('localhost')) console.log(error)
      // need to add error alerts
    } finally {
      setLoading(false)
    }
  } else {
    // need to add error alerts saying 'please fill out all fields'
  }
}

export const getPosts = async (setLoading, setAllPosts) => {
  setLoading(true)

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const result = await response.json()
      setAllPosts(result.data.reverse())
    }
  } catch (error) {
    if (import.meta.env.VITE_API_URL.includes('localhost')) console.log(error)
    // TODO: Add error handling
  } finally {
    setLoading(false)
  }
}
