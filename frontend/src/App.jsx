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

  const [allCategories, setAllCategories] = useState([]);

  const [newCategory, setNewCategory] = useState({
    englishTitle: "",
    spanishTitle: "",
    categoryImage: ""
  });

  const notify = (msg) => toast(msg);

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
        notify("Erorr creating course.");
      } else {
        notify(`${newCourse.englishTitle} created.`);
        setNewCourse({
          englishTitle: "",
          spanishTitle: "",
          englishLink: "",
          spanishLink: "",
          category: "",
          contentType: "",
          active: true
        });
        getCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        getCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const categoriesData = await res.json();

      if (res.ok) {
        setAllCategories(categoriesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        notify("Erorr creating category.");
      } else {
        notify(`${newCategory.englishTitle} created.`);
        setNewCategory({
          englishTitle: "",
          spanishTitle: "",
          categoryImage: ""
        });
        getCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
    getCategories();
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
          value={newCourse.category}
          onChange={(e) => {
            setNewCourse({ ...newCourse, category: e.target.value });
          }}
        >
          <option></option>
          {allCategories?.data?.map((i) => (
            <option key={i._id}>{i.englishTitle}</option>
          ))}
        </select>
        <select
          name="contentType"
          value={newCourse.contentType}
          onChange={(e) => {
            setNewCourse({ ...newCourse, contentType: e.target.value });
          }}
        >
          <option></option>
          <option>Video</option>
          <option>PDF</option>
        </select>
        Active{" "}
        <input
          type="radio"
          name="active"
          onClick={(e) => {
            setNewCourse({ ...newCourse, active: true });
          }}
          defaultChecked
        />
        Inactive{" "}
        <input
          type="radio"
          name="active"
          onClick={(e) => {
            setNewCourse({ ...newCourse, active: false });
          }}
        />
        <button type="submit">Create Course</button>
      </form>

      <form onSubmit={createCategory}>
        <input
          placeholder="English Title"
          name="englishTitle"
          value={newCategory.englishTitle}
          onChange={(e) => {
            setNewCategory({ ...newCategory, englishTitle: e.target.value });
          }}
        />

        <input
          placeholder="Spanish Title"
          name="spanishTitle"
          value={newCategory.spanishTitle}
          onChange={(e) => {
            setNewCategory({ ...newCategory, spanishTitle: e.target.value });
          }}
        />

        <input
          placeholder="Category Image"
          name="categoryImage"
          value={newCategory.categoryImage}
          onChange={(e) => {
            setNewCategory({ ...newCategory, categoryImage: e.target.value });
          }}
        />

        <button type="submit">Create Category</button>
      </form>

      <Toaster
        toastOptions={{
          className: "toast"
        }}
      />

      {allCourses?.data?.map((i) => (
        <>
          {i.englishTitle}
          <button
            onClick={() => {
              deleteCourse(i._id);
              notify(`${i.englishTitle} deleted.`);
            }}
          >
            Delete
          </button>
          <br />
        </>
      ))}
    </>
  );
}
