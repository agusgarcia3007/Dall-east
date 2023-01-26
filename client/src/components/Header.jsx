import { Link, useLocation } from 'react-router-dom'

import { logo } from '../assets'
import DropDown from './DropDown'

const Header = () => {
  const { pathname } = useLocation()

  return (
    <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
      <Link to='/'>
        <img src={logo} alt='logo' draggable={false} className='w-28 object-contain' />
      </Link>

      <div className='flex gap-x-3'>
        {pathname !== '/create-post' ? (
          <Link
            to='create-post'
            className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
            Create
          </Link>
        ) : null}

        <DropDown pathname={pathname} />
      </div>
    </header>
  )
}

export default Header
