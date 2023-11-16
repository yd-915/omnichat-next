'use client'

function CheckoutBtn() {

const createCheckOutSession = async () => {
    
}

  return (
    <div className='flex flex-col space-y-2'>
{/* If sub show user subed */}
    <button 
    onClick={() => createCheckOutSession()}
    className='
    mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold text-white leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80 disabled:bg-indigo-600/50 disabled:text-white disabled:cursor-default
    '>
    Become a Pro Member
    </button>

    </div>

  )
}

export default CheckoutBtn