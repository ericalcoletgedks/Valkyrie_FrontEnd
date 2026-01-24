import type { DashboardProject } from '@/types/index'
import { ProjectDropdown } from './ProjectDropdown'
import { CalendarBlankIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { formatDateFull } from '@/utils/utils'
import { useAuth } from '@/hooks/useAuth'

type ProjectCardProps = {
  list: boolean
  project: DashboardProject
}


export const ProjectCard = ({ list, project }: ProjectCardProps) => {

  const { data: user, isLoading: authLoading } = useAuth();

  return (
    <div className={`bg-(--content) border border-(--border) hover:border-(--white)/50 mb-5 rounded-lg p-5 transition-all overflow-hidden`}>

      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <Link to={`projects/${project._id}`} className='text-base hover:underline'> {project.projectName} </Link>
          {list && (<h3 className='mt-1 text-sm text-(--white)/50'> {project.clientName} </h3>)}
        </div>

        <div className='flex items-center gap-2'>
          
          {!authLoading && <ProjectDropdown id={project._id} project={project} />}

        </div>
      </div>
      {!list && (<h3 className='mt-1 text-sm text-(--white)'> {project.clientName} </h3>)}
      {!list && (
        <h4 className={`mt-2 text-(--white)/50 text-justify overflow-y-scroll px-2 rounded-sm text-sm ${list ? 'max-h-24' : 'max-h-30 xl:max-h-80'}`}>
          {project.description}
        </h4>
      )}


      <div className={`mt-3 w-full flex justify-between`}>
        <div className='flex items-center gap-3'>
          {!authLoading && (
            project.manager === user?._id ?
              (
                <p className='flex items-center gap-2 text-xs'> <span className='w-2 h-2 rounded-full bg-(--success)'></span> Admin</p>
              ) :
              (
                <p className='flex items-center gap-2 text-xs'> <span className='w-2 h-2 rounded-full bg-(--warning)'></span> Member</p>
              )

          )}

          <p className='flex items-center gap-2 text-xs'> <CalendarBlankIcon weight='duotone' /> {formatDateFull(project.createdAt)} </p>

        </div>
        <Link to={`projects/${project._id}`} className='flex items-center gap-1 bg-(--white) hover:bg-(--white)/80 py-1 px-3 text-sm rounded-lg text-(--black)'> View</Link>
      </div>
    </div>
  )
}
