import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [allCourses, setAllCourses] = useState([]);
  const [singleCourse, setSingleCourse] = useState([]);

  const [newCourse, setNewCourse] = useState({
    englishTitle: "",
    spanishTitle: "",
    englishLink: "",
    spanishLink: "",
    category: "",
    contentType: "",
    active: true
  });

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

  const createCourse = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(newCourse),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const notify = () => toast("Error");
        notify();
      } else {
        const notify = () => toast(newCourse?.englishTitle);
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
      <form onSubmit={createCourse}>
        <input
          placeholder="English Title"
          name="englishTitle"
          value={newCourse.englishTitle}
          onChange={(e) => {
            setNewCourse({ ...newCourse, englishTitle: e.target.value });
          }}
        />

        <input
          placeholder="Spanish Title"
          name="spanishTitle"
          value={newCourse.spanishTitle}
          onChange={(e) => {
            setNewCourse({ ...newCourse, spanishTitle: e.target.value });
          }}
        />

        <input
          placeholder="English Link"
          name="englishLink"
          value={newCourse.englishLink}
          onChange={(e) => {
            setNewCourse({ ...newCourse, englishLink: e.target.value });
          }}
        />

        <input
          placeholder="Spanish Link"
          name="spanishLink"
          value={newCourse.spanishLink}
          onChange={(e) => {
            setNewCourse({ ...newCourse, spanishLink: e.target.value });
          }}
        />

        <select
          name="category"
          onChange={(e) => {
            setNewCourse({ ...newCourse, category: e.target.value });
          }}
        >
          <option></option>
          <option>Health & Wellness</option>
          <option>Workforce Integration</option>
        </select>

        <select
          name="contentType"
          onChange={(e) => {
            setNewCourse({ ...newCourse, contentType: e.target.value });
          }}
        >
          <option></option>
          <option>Video</option>
          <option>PDF</option>
        </select>

        <input
          type="radio"
          name="active"
          onClick={(e) => {
            setNewCourse({ ...newCourse, active: true });
          }}
        />
        <input
          type="radio"
          name="active"
          onClick={(e) => {
            setNewCourse({ ...newCourse, active: false });
          }}
        />

        <button type="submit">Create Course</button>
      </form>

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
