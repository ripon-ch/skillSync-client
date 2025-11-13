import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { COURSE_CATEGORIES } from "@/shared/api.js";

import { toast } from "sonner";

export default function AllCourses() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            try {
                const response = await fetch("/api/courses");
                if (!response.ok) throw new Error("Failed to fetch courses");
                const data = await response.json();
                if (Array.isArray(data) && data.length === 0) {
                    return sampleCourses;
                }
                return data;
            } catch (err) {
                console.error("Error fetching courses:", err);
                toast.error("Failed to load courses");
                return sampleCourses;
            }
        },
        staleTime: 1000 * 60
    });

    const courses = data || [];

    // debounce search
    useMemo(() => {
        const t = setTimeout(() => setDebouncedSearch(searchTerm), 250);
        return () => clearTimeout(t);
    }, [searchTerm]);

    const filteredCourses = useMemo(() => {
        let filtered = courses;
        if (selectedCategory !== "All") {
            filtered = filtered.filter(
                course => course.category === selectedCategory
            );
        }
        if (debouncedSearch) {
            const term = debouncedSearch.toLowerCase();
            filtered = filtered.filter(
                course =>
                    (course.title || "").toLowerCase().includes(term) ||
                    (course.description || "").toLowerCase().includes(term)
            );
        }
        return filtered;
    }, [courses, selectedCategory, debouncedSearch]);

    return (
        <div className="min-h-screen" style={{ background: "#f1f5f9" }}>
            {/* Header */}
            <div
                style={{
                    background: "linear-gradient(to right, #220359, #4906BF)",
                    padding: "4rem 1rem"
                }}
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        Explore Courses
                    </h1>
                    <p style={{ color: "#e9d5ff" }}>
                        Discover and enroll in courses that match your goals
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sticky top-24">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                                Filters
                            </h3>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Search Courses
                                </label>
                                <div className="relative">
                                    <Search
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search by title..."
                                        value={searchTerm}
                                        onChange={e =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                    Category
                                </label>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            value="All"
                                            checked={selectedCategory === "All"}
                                            onChange={e =>
                                                setSelectedCategory(
                                                    e.target.value
                                                )
                                            }
                                            className="w-4 h-4 cursor-pointer accent-blue-600"
                                        />
                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                                            All Categories
                                        </span>
                                    </label>
                                    {COURSE_CATEGORIES.map(category => (
                                        <label
                                            key={category}
                                            className="flex items-center gap-3 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="category"
                                                value={category}
                                                checked={
                                                    selectedCategory ===
                                                    category
                                                }
                                                onChange={e =>
                                                    setSelectedCategory(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-4 h-4 cursor-pointer accent-blue-600"
                                            />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                                {category}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Reset Button */}
                            {(selectedCategory !== "All" || searchTerm) && (
                                <button
                                    onClick={() => {
                                        setSelectedCategory("All");
                                        setSearchTerm("");
                                    }}
                                    className="w-full mt-6 px-4 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Courses Grid */}
                    <div className="lg:col-span-3">
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-80 bg-card border border-border rounded-lg animate-pulse"
                                    />
                                ))}
                            </div>
                        ) : filteredCourses.length > 0 ? (
                            <>
                                <div className="mb-4 text-sm text-muted-foreground">
                                    Showing {filteredCourses.length} course
                                    {filteredCourses.length !== 1 ? "s" : ""}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                    {filteredCourses.map(course => (
                                        <CourseCard
                                            key={course._id || course.id}
                                            course={course}
                                            showEnroll={true}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">
                                    No courses found
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory("All");
                                        setSearchTerm("");
                                    }}
                                    className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const sampleCourses = [
    {
        _id: "1",
        title: "Web Development Bootcamp",
        image: "https://via.placeholder.com/300x200?text=Web+Development",
        price: 99.99,
        duration: "40 hours",
        category: "Web Development",
        description: "Learn full-stack web development from scratch",
        instructor: "John Doe"
    },
    {
        _id: "2",
        title: "React Advanced Patterns",
        image: "https://via.placeholder.com/300x200?text=React",
        price: 79.99,
        duration: "30 hours",
        category: "Programming",
        description: "Master advanced React concepts and patterns",
        instructor: "Jane Smith"
    },
    {
        _id: "3",
        title: "Data Science Fundamentals",
        image: "https://via.placeholder.com/300x200?text=Data+Science",
        price: 89.99,
        duration: "35 hours",
        category: "Data Science",
        description: "Introduction to data science and analytics",
        instructor: "Bob Johnson"
    },
    {
        _id: "4",
        title: "UI/UX Design Principles",
        image: "https://via.placeholder.com/300x200?text=Design",
        price: 69.99,
        duration: "25 hours",
        category: "Design",
        description: "Learn modern design principles and UX best practices",
        instructor: "Sarah Wilson"
    },
    {
        _id: "5",
        title: "Digital Marketing Mastery",
        image: "https://via.placeholder.com/300x200?text=Marketing",
        price: 79.99,
        duration: "28 hours",
        category: "Business",
        description: "Master digital marketing strategies and tools",
        instructor: "Michael Brown"
    },
    {
        _id: "6",
        title: "Python for Everyone",
        image: "https://via.placeholder.com/300x200?text=Python",
        price: 59.99,
        duration: "20 hours",
        category: "Programming",
        description: "Learn Python programming from basics to advanced",
        instructor: "Emily Davis"
    },
    {
        _id: "7",
        title: "Mobile App Development",
        image: "https://via.placeholder.com/300x200?text=Mobile",
        price: 89.99,
        duration: "38 hours",
        category: "Mobile Development",
        description: "Build professional mobile apps for iOS and Android",
        instructor: "John Doe"
    },
    {
        _id: "8",
        title: "Machine Learning Basics",
        image: "https://via.placeholder.com/300x200?text=ML",
        price: 99.99,
        duration: "42 hours",
        category: "Data Science",
        description: "Introduction to machine learning algorithms",
        instructor: "Bob Johnson"
    }
];
