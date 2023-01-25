import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Pagination = ({ setPagination, pagination, indexOfFirstPost, indexOfLastPost }) => {
  if (pagination.totalPages > 1) {
    return (
      <div className='flex items-center justify-end  px-4 py-3 sm:px-6'>
        <div className='flex  sm:hidden'>
          {pagination.currentPage > 1 && (
            <button
              onClick={() =>
                setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })
              }
              className='relative inline-flex items-center rounded-l-md border border-gray-300  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 '>
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          )}

          {pagination.currentPage < pagination.totalPages && (
            <button
              onClick={() =>
                setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })
              }
              className='relative inline-flex items-center rounded-r-md border border-gray-300  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 '>
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          )}
        </div>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Showing <span className='font-medium'>{indexOfFirstPost + 1}</span> to{' '}
              <span className='font-medium'>
                {indexOfLastPost > pagination.totalResults
                  ? pagination.totalResults
                  : indexOfLastPost}
              </span>{' '}
              of <span className='font-medium'>{pagination.totalResults}</span> results
            </p>
          </div>
          <div>
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
              aria-label='Pagination'>
              {pagination.currentPage > 1 && (
                <button
                  onClick={() =>
                    setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })
                  }
                  className='relative inline-flex items-center rounded-l-md border border-gray-300  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 '>
                  <span className='sr-only'>Previous</span>
                  <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              )}
              <div className='z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center border p-2 text-sm font-medium'>
                {pagination.currentPage}
              </div>
              {pagination.currentPage < pagination.totalPages && (
                <button
                  onClick={() =>
                    setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })
                  }
                  className='relative inline-flex items-center rounded-r-md border border-gray-300  px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 '>
                  <span className='sr-only'>Next</span>
                  <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default Pagination
