
export const ResultLoading = () => {
    return (
        <div className='flex flex-col gap-5 pb-3 mb-5 overflow-y-scroll max-h-96 border-b border-(--border) transition-all'>

            <p className='text-sm text-center'>Search result</p>

            <div className='flex items-center justify-between gap-5'>
                <div className='flex gap-3 items-center'>
                    <div className='p-7 bg-(--hover) animate-pulse rounded-full'> </div>
                    <div className='flex flex-col gap-2'>
                        <div className='bg-(--hover) animate-pulse py-2 px-16 rounded-2xl'> </div>
                        <div className='bg-(--hover) animate-pulse py-2 px-6 rounded-2xl'> </div>
                    </div>
                </div>
                <div className='p-1 px-11 py-4 animate-pulse bg-(--hover) rounded-lg'></div>
            </div>

        </div>
    )
}
