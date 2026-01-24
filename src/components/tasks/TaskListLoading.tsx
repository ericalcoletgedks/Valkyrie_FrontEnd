
export const TaskListLoading = () => {
    return (
        <div className="flex flex-col gap-3">

            <h2 className="p-2 h-6 bg-(--content) animate-pulse text-center rounded-lg">

            </h2>

            <div className="flex justify-between">
                <h2 className="p-2 w-28 h-4 bg-(--content) animate-pulse text-center rounded-lg"></h2>
                <h2 className="p-2 w-12 h-4 bg-(--content) animate-pulse text-center rounded-lg"></h2>
            </div>

            <div className="h-36 p-2 bg-(--content) animate-pulse rounded-lg transition-all"></div>


        </div>
    )
}
