import "./index.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllCourses from "./pages/AllCourses";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";
import AddCourse from "./pages/AddCourse";
import MyCourses from "./pages/MyCourses";
import MyEnrolledCourses from "./pages/MyEnrolledCourses";
import UpdateCourse from "./pages/UpdateCourse";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <AuthProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Index />} />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="/courses"
                                    element={<AllCourses />}
                                />
                                <Route
                                    path="/course/:id"
                                    element={
                                        <ProtectedRoute>
                                            <CourseDetails />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/add-course"
                                    element={
                                        <ProtectedRoute>
                                            <AddCourse />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/my-courses"
                                    element={
                                        <ProtectedRoute>
                                            <MyCourses />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/my-enrolled-courses"
                                    element={
                                        <ProtectedRoute>
                                            <MyEnrolledCourses />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/update-course/:id"
                                    element={
                                        <ProtectedRoute>
                                            <UpdateCourse />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </AuthProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

createRoot(document.getElementById("root")).render(<App />);
