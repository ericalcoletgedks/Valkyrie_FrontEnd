import { Routes, Route, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { Dashboard } from "./views/Dashboard";
import DeleteProjectModal from "./components/projects/DeleteProjectModal";
import { ProjectDetails } from "./views/projects/ProjectDetails";
import { AuthLayout } from "./layouts/AuthLayout";
import { LoginView } from "./views/auth/LoginView";
import { RegisterView } from "./views/auth/RegisterView";
import { ValidationView } from "./views/auth/ValidationView";
import { RequestNewCodeView } from "./views/auth/RequestNewCodeView";
import { ForgotPasswordView } from "./views/auth/ForgotPasswordView";
import { NewPasswordView } from "./views/auth/NewPasswordView";
import { NotFound } from "./views/404/NotFound";

export default function Router() {

    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route element={<AppLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="projects/:projectId" element={<ProjectDetails />} />
                    <Route path="projects/:id/edit" element={<Dashboard />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/validation" element={<ValidationView />} />
                    <Route path="/auth/request-code" element={<RequestNewCodeView />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>

            {/* MODALS */}
            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path="projects/:idToDelete/delete"
                        element={<DeleteProjectModal />}
                    />
                </Routes>
            )}
        </>
    );
}