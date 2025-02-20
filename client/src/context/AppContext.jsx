
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";
import { createContext, useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const navigate = useNavigate()
    const { getToken } = useAuth()
    const { user } = useUser()
    
    const currency = import.meta.env.VITE_CURRENCY
    const [allCourses, setAllCourses] = useState([])
    const [isEducator,setIsEducator] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    
    // fetch all courses from dummy data
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }
    // calculate rating
    const calculateRating = (course) => {

        if (course.courseRatings.length === 0) {
            return 0
        }

        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return Math.floor(totalRating / course.courseRatings.length)
    }

    // Function to Calculate Course Chapter Time
    const calculateChapterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })

    }

    // Function to Calculate Course Duration
    const calculateCourseDuration = (course) => {
        let time = 0
        course.courseContent.map(
            (chapter) => chapter.chapterContent.map(
                (lecture) => time += lecture.lectureDuration
            )
        )
        return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] })
    }
    
    // function to calculate no of lectures
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    }
    //  is user enrolled in a course
     const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses)

    //     const token = await getToken();

    //     const { data } = await axios.get(backendUrl + '/api/user/enrolled-courses',
    //         { headers: { Authorization: `Bearer ${token}` } })

    //     if (data.success) {
    //         setEnrolledCourses(data.enrolledCourses.reverse())
    //     } else (
    //         toast.error(data.message)
    //     )

     }

    // Fetch User's Data if User is Logged In
    useEffect(() => {
        fetchAllCourses()
        fetchUserEnrolledCourses()
    }, [])

    const logToken = async () => {
        console.log(await getToken())
    }

     // Fetch User's Data if User is Logged In
     useEffect(() => {
        if (user) {
            // fetchUserData()
            // fetchUserEnrolledCourses()
            logToken()
        }
    }, [user]) 


    const value = {
        currency,allCourses,
        navigate,
        calculateRating,
        isEducator,setIsEducator,
        calculateChapterTime, calculateCourseDuration,calculateNoOfLectures,
        enrolledCourses,fetchUserEnrolledCourses,
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}