import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getUserPosts } from '../utils/fetchingFunctions'
import { Loader, RenderCards } from '../components'
import { profile } from '../assets'

const Feed = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const { pathname } = useLocation()
  const username = pathname.split('/')[2]

  const [userPosts, setUserPosts] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0
  })

  const itsMe = isAuthenticated && user.nickname === username

  useEffect(() => {
    if (user && itsMe) {
      getUserPosts(setUserPosts, user, pagination.currentPage, setPagination)
    } else {
      getUserPosts(setUserPosts, username, pagination.currentPage, setPagination)
    }
  }, [user, username])

  if (isLoading)
    return (
      <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] '>
        <Loader />
      </div>
    )

  return (
    <section className='max-w-7xl mx-auto'>
      <div className='my-8 flex gap-x-3 items-center bg-white shadow-card rounded-lg p-5'>
        {userPosts[0]?.avatar ? (
          <img
            src={userPosts[0]?.avatar}
            className='w-16 h-16 sm:w-24 sm:h-24 border-2 border-[#222328] object-cover rounded-full'
          />
        ) : (
          <img src={profile} alt='profile' className='w-16 h-16 z-10 text-black object-contain ' />
        )}
        <div>
          <h1 className='font font-bold text-[#222328] text-[24px]'>
            {itsMe ? 'Your ' : `${username}'s`} Feed
          </h1>
          {itsMe ? <p className='text-gray-600 inter'>{userPosts[0]?.name}</p> : null}
        </div>
      </div>
      <h1 className='font font-extrabold text-[#222328] text-[32px]'></h1>
      <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
        <RenderCards data={userPosts} title='No posts found' />
      </div>
    </section>
  )
}

export default Feed
