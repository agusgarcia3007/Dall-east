import { toast } from 'react-toastify'

const notify = (msg) => {
  toast.error(msg, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export const generateImage = async (setGeneratingImg, form, setForm, setHasGeneratedImg) => {
  if (form.prompt) {
    setHasGeneratedImg(false)
    try {
      setGeneratingImg(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dalle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: form.prompt })
      })
      if (response.ok) {
        const data = await response.json()

        setForm({ ...form, image: `data:image/png;base64,${data.image}` })
        setHasGeneratedImg(true)
      } else {
        notify(
          'Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system.'
        )
      }
    } catch (error) {
      if (import.meta.env.VITE_API_URL.includes('localhost')) console.log(error.message)
      notify(error.message)
    } finally {
      setGeneratingImg(false)
    }
  } else {
    notify('Please enter a prompt')
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
      notify(error.message)
    } finally {
      setLoading(false)
    }
  } else {
    notify('Please fill out all fields')
  }
}

export const getPosts = async (setAllPosts, currentPage, setPagination) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts?page=${currentPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const result = await response.json()
      setAllPosts(result.data)
      setPagination(result.pagination)
    }
  } catch (error) {
    if (import.meta.env.VITE_API_URL.includes('localhost')) console.log(error)
    notify(error.message)
  }
}

export const searchPosts = async (searchText) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/search?query=${searchText}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.ok) {
      const result = await response.json()
      return await result
    }
  } catch (error) {
    if (import.meta.env.VITE_API_URL.includes('localhost')) console.log(error)
  }
}

export const getUserPosts = async (setUserPosts, user, currentPage, setPagination) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${user?.nickname || user}?page=${currentPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.ok) {
      const result = await response.json()
      setUserPosts(result.data)
      setPagination(result.pagination)
    }
  } catch (error) {
    if (import.meta.env.VITE_API_URL.includes('localhost')) console.log(error)
    notify(error.message)
  }
}
