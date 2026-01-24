import { getFullProjectById } from "@/api/ProjectApi";
import { ProjectTeamModal } from "@/components/team/ProjectTeamModal";
import { AddTasksModal } from "@/components/tasks/AddTasksModal";
import DeleteTaskModal from "@/components/tasks/DeleteTaskModal";
import { EditTaskModal } from "@/components/tasks/EditTaskModal";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskListLoading } from "@/components/tasks/TaskListLoading";
import { ViewTaskModal } from "@/components/tasks/ViewTaskModal";
import { ShareNetworkIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useMemo } from "react";
import { ProfileModal } from "@/components/user/ProfileModal";

export const ProjectDetails = () => {

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const { data: user, isLoading: authLoading } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getFullProjectById(projectId),
    retry: 1
  });

  const canEdit = useMemo(() => {
    return data?.manager === user?._id;
  }, [data, user]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  if (isLoading && authLoading) {
    return (
      <>
        <div className={`grid sm:grid-cols-2 md:grid-cols-5 gap-5 h-full`}>
          <TaskListLoading />
          <TaskListLoading />
          <TaskListLoading />
          <TaskListLoading />
          <TaskListLoading />
        </div >
      </>
    )
  }

  if (data && user) {

    return (
      <div>

        <div className="flex justify-between items-center mb-5">
          <div>
            <div className="flex items-center gap-1">
              <button onClick={() => navigate('/')} className="text-lg hover:underline cursor-pointer"> My projects </button>
              <span className="flex items-center gap-2 text-base text-(--white)/50">/ {data?.projectName} </span>
            </div>
            <p className="text-(--white)/50 text-base mt-1">Create tasks, drag and drop to complete them, and invite teammates.</p>
          </div>

          <div className="flex items-center gap-1">
            {user && user._id === data?.manager && (
              <Link to={'?projectTeam=true'} className="flex items-center gap-1 text-md rounded-lg hover:underline cursor-pointer"> <ShareNetworkIcon /> Share </Link>
            )}
          </div>
        </div>

        <TaskList tasks={data.tasks} canEdit={canEdit} />

        <AddTasksModal />
        <ViewTaskModal />
        <EditTaskModal />
        <DeleteTaskModal />
        <ProjectTeamModal />
        <ProfileModal />

      </div>
    )
  }

}

