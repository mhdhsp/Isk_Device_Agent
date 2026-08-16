import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import GymUsers from "../pages/users/GymUsers";
import MartialUsers from "../pages/users/MartialUsers";
import Settings from "../pages/settings/Settings";
import NotFound from "../pages/NotFound";
import Users from "../pages/Users/Users";
import NewUser from "../pages/Users/NewUser";
import EditUser from "../pages/users/EditUser";

function AppRoutes() {
    return (
        <Routes>

            {/* Redirect root */}
            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            {/* Main Layout */}
            <Route element={<MainLayout />}>

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route
                    path="users"
                    element={<Users />}
                />
                <Route path="/users/new" element={<NewUser />} />
                <Route path="/users/:id/edit" element={<EditUser />} />
                <Route
                    path="/gym"
                    element={<GymUsers />}
                />

                <Route
                    path="/martial"
                    element={<MartialUsers />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

            </Route>

            {/* 404 */}
            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default AppRoutes;