import { fetchProjects } from "@/api/ProjectApi";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { ProjectCardLoading } from "@/components/projects/ProjectCardLoading";
import { FolderOpenIcon, ListBulletsIcon, PlusCircleIcon, SquaresFourIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditProjectModal } from "@/components/projects/EditProjectModal";
import { ProjectTeamModal } from "@/components/team/ProjectTeamModal";
import { ProfileModal } from "@/components/user/ProfileModal";
import type { DashboardProject } from "../types";

export const Dashboard = () => {

    let [isOpen, setIsOpen] = useState(false);
    let [isOpenEdit, setIsOpenEdit] = useState(false);
    const [list, setList] = useState(false);
    const [filteredData, setFilteredData] = useState<DashboardProject[]>([]);
    const { data, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects
    });
    const params = useParams();

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (data) {
            const newData = data.filter((project) =>
                project.projectName.toLowerCase().includes(event.target.value.toLowerCase()
                ));
            setFilteredData(newData);
        }
    }

    useEffect(() => {
        if (params.id) {
            setIsOpenEdit(true);
        }
    }, [params])

    if (!isLoading) {

        if (data) {

            if (filteredData.length > 0) {
                return (
                    <>
                        <div className="flex mb-5 gap-2">
                            <button className="bg-(--white) hover:bg-(--white)/80 cursor-pointer py-1 px-3 text-nowrap text-sm text-(--black) rounded-full">My projects</button>
                        </div>

                        <div className="flex justify-between items-center gap-2 mb-5">
                            <input onChange={handleFilter} type="text" placeholder="Search for projects..." className="w-full p-2 outline-none bg-(--content) border border-(--border) rounded-lg" />
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 bg-(--content) border border-(--border) p-2 rounded-lg">
                                    <SquaresFourIcon onClick={() => setList(false)} size={25} className={`${list && 'fill-(--white)/20'} cursor-pointer `} />
                                    <ListBulletsIcon onClick={() => setList(true)} size={25} className={`${!list && 'fill-(--white)/20'} cursor-pointer `} />
                                </div>

                                <button onClick={() => setIsOpen(true)} className="flex items-center gap-1 bg-(--white) hover:bg-(--white)/80 cursor-pointer py-2 px-4 text-nowrap text-md text-(--black) rounded-lg"> <PlusCircleIcon weight="bold" className="fill-(--black)" /> Create</button>
                            </div>
                        </div>

                        {/* <div className={`grid ${list ? 'grid-cols-1' : 'sm:grid-cols-2 md:grid-cols-3'} gap-5`}> */}
                        <div className={`columns-1 ${!list && 'sm:columns-2 md:columns-3 xl:columns-3 2xl:columns-4 gap-5'}`}>
                            {!isLoading ?
                                (
                                    filteredData.map((project) => (
                                        <ProjectCard key={project._id} list={list} project={project} />
                                    ))
                                ) :
                                (
                                    <ProjectCardLoading list={list} />
                                )}
                        </div>
                        <CreateProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
                        {params.id && <EditProjectModal isOpenEdit={isOpenEdit} setIsOpenEdit={setIsOpenEdit} id={params.id} />}
                        <ProjectTeamModal />
                        <ProfileModal />
                    </>
                )
            }

            return (
                <>

                    <div className="flex flex-col mb-5">
                        {/** <button className="bg-(--white) hover:bg-(--white)/80 cursor-pointer py-1 px-3 text-nowrap text-sm text-(--black) rounded-full">My projects</button> */}
                        <h1 className="text-lg">My projects</h1>
                        <p className="text-(--white)/50 text-base mt-1">Create your projects and start building your path.</p>
                    </div>

                    <div className="flex justify-between items-center gap-2 mb-5">
                        <input onChange={handleFilter} type="text" placeholder="Search for projects..." className="w-full p-2 outline-none bg-(--content) border border-(--border) rounded-lg" />
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 bg-(--content) border border-(--border) p-2 rounded-lg">
                                <SquaresFourIcon onClick={() => setList(false)} size={25} className={`${list && 'fill-(--white)/20'} cursor-pointer `} />
                                <ListBulletsIcon onClick={() => setList(true)} size={25} className={`${!list && 'fill-(--white)/20'} cursor-pointer `} />
                            </div>

                            <button onClick={() => setIsOpen(true)} className="flex items-center gap-1 bg-(--white) hover:bg-(--white)/80 cursor-pointer py-2 px-4 text-nowrap text-md text-(--black) rounded-lg"> <PlusCircleIcon weight="bold" className="fill-(--black)" /> Create</button>
                        </div>
                    </div>

                    {/* <div className={`grid ${list ? 'grid-cols-1' : 'sm:grid-cols-2 md:grid-cols-3'} gap-5`}> */}
                    <div className={`columns-1 ${!list && 'sm:columns-2 md:columns-3 xl:columns-3 2xl:columns-4 gap-5'}`}>
                        {!isLoading ?
                            (
                                data.map((project) => (
                                    <ProjectCard key={project._id} list={list} project={project} />
                                ))
                            ) :
                            (
                                <ProjectCardLoading list={list} />
                            )}
                    </div>
                    <CreateProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
                    {params.id && <EditProjectModal isOpenEdit={isOpenEdit} setIsOpenEdit={setIsOpenEdit} id={params.id} />}
                    <ProjectTeamModal />
                    <ProfileModal />
                </>
            )
        } else {
            return (
                <div className="flex flex-col m-auto mt-50 items-center justify-center">

                    <FolderOpenIcon className="animate-bounce" weight="thin" size={80} />
                    <h2 className="text-center text-lg">You don't have any projects</h2>

                    <button onClick={() => setIsOpen(true)} className="flex items-center mt-5 gap-1 bg-(--white) hover:bg-(--white)/80 cursor-pointer py-1 px-4 text-nowrap text-md text-(--black) rounded-full"> <PlusCircleIcon weight="bold" className="fill-(--black)" /> Create project</button>
                    <CreateProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            )
        }

    } else {
        return (
            <>
                <div className="flex justify-between items-center gap-2 mb-5">
                    <input type="text" placeholder="Search for products..." className="w-full p-2 outline-none bg-(--content) border border-(--border) rounded-lg" />
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-(--content) border border-(--border) p-2 rounded-lg">
                            <SquaresFourIcon onClick={() => setList(false)} size={25} className={`${list && 'fill-(--white)/20'} cursor-pointer `} />
                            <ListBulletsIcon onClick={() => setList(true)} size={25} className={`${!list && 'fill-(--white)/20'} cursor-pointer `} />
                        </div>

                        <button onClick={() => setIsOpen(true)} className="flex items-center gap-1 bg-(--white) hover:bg-(--white)/80 cursor-pointer py-2 px-4 text-nowrap text-md text-(--black) rounded-lg"> <PlusCircleIcon weight="bold" className="fill-(--black)" /> Create</button>
                    </div>
                </div>

                {/* <div className={`grid ${list ? 'grid-cols-1' : 'sm:grid-cols-2 md:grid-cols-3'} gap-5`}> */}
                <div className={`columns-1 ${!list && 'sm:columns-2 md:columns-3 xl:columns-4 gap-5'}`}>

                    <ProjectCardLoading list={list} />

                </div>
            </>
        )
    }
}
