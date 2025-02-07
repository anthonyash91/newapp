import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [allCourses, setAllCourses] = useState([]);
  const [singleCourse, setSingleCourse] = useState([]);

  const getCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const coursesData = await res.json();

      if (res.ok) {
        setAllCourses(coursesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async (id) => {
    try {
      const res = await fetch(`/api/courses/${id}`);
      const courseData = await res.json();

      if (res.ok) {
        setSingleCourse(courseData);
        const notify = () => toast(courseData?.data?.englishTitle);
        notify();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          className: "toast"
        }}
      />

      {allCourses?.data?.map((i) => (
        <>
          <button
            onClick={() => {
              getCourse(i._id);
            }}
          >
            Get Course
          </button>
          <br />
        </>
      ))}
    </>
  );
}
