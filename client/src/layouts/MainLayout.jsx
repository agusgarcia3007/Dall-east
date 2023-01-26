import { Outlet } from 'react-router-dom'
import { Header } from '../components'

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
