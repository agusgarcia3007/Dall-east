import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { profile } from '../assets'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

const DropDown = ({ pathname }) => {
  const { loginWithRedirect, loginWithPopup, logout, user, isAuthenticated, isLoading } = useAuth0()

  const handleAuth = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } })
    } else {
      pathname === '/create-post' ? loginWithPopup() : loginWithRedirect()
    }
  }
  if (isLoading)
    return (
      <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] '>
        <Loader />
      </div>
    )

  return (
    <Menu as='div' className='relative flex items-center'>
      <Menu.Button className='outline-none bg-transparent border-none'>
        {isAuthenticated ? (
          <img
            src={user?.picture}
            alt={user?.given_name}
            className='w-9 h-9 z-10 text-black object-contain border-black rounded-full'
          />
        ) : (
          <img src={profile} alt='profile' className='w-9 h-9 z-10 text-black object-contain ' />
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='absolute right-0 z-10 mt-24 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {isAuthenticated && (
            <>
              <Menu.Item>
                <h1 className='block px-4 py-2 text-sm text-gray-900 w-full h-full text-left'>
                  Hi {user?.given_name}!
                </h1>
              </Menu.Item>
              <Menu.Item>
                <Link
                  to={`/feed/${user?.nickname}`}
                  className='block px-4 py-2 text-sm text-gray-900 w-full h-full text-left hover:bg-gray-50'>
                  My posts
                </Link>
              </Menu.Item>
            </>
          )}
          <Menu.Item>
            <button
              onClick={handleAuth}
              className='block px-4 py-2 text-sm text-gray-700 w-full h-full text-left hover:bg-gray-50'>
              {isAuthenticated ? 'Logout' : 'Log in'}
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropDown
