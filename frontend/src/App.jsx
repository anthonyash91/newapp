import { useState, useEffect } from "react";
import {
  Input,
  Select,
  Radio,
  RadioGroup,
  Button,
  Flex,
  Box,
  useToast,
  Spacer
} from "@chakra-ui/react";
import { UploadButton } from "@bytescale/upload-widget-react";

export default function App() {
  const [allCourses, setAllCourses] = useState([]);
  const [singleCourse, setSingleCourse] = useState([]);

  const [courseStatus, setCourseStatus] = useState("true");

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

  const toast = useToast();

  const [deleteButton, setDeleteButton] = useState("none");

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
        toast({
          title: "Erorr creating course.",
          status: "error"
        });
      } else {
        toast({
          title: `Course "${newCourse.englishTitle}" created.`,
          status: "success"
        });
        setNewCourse({
          englishTitle: "",
          spanishTitle: "",
          englishLink: "",
          spanishLink: "",
          category: "",
          contentType: "",
          active: true
        });
        setCourseStatus("true");
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
        toast({
          title: "Erorr creating category.",
          status: "error"
        });
      } else {
        toast({
          title: `Category "${newCategory.englishTitle}" created.`,
          status: "success"
        });
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

  const options = {
    apiKey: "public_223k24FBYTp3msVUE8shtNXQk57H", // This is your API key.
    maxFileCount: 1,
    showFinishButton: false,
    editor: {
      images: {
        crop: false,
        preview: false
      }
    }
  };

  useEffect(() => {
    getCourses();
    getCategories();
  }, []);

  return (
    <main>
      <Flex flexDirection="row" gap="50" w="90%">
        <Box flexBasis="100%">
          <form onSubmit={createCourse}>
            <Flex flexDirection="column" gap="5">
              <Input
                placeholder="English Title"
                name="englishTitle"
                value={newCourse.englishTitle}
                onChange={(e) => {
                  setNewCourse({ ...newCourse, englishTitle: e.target.value });
                }}
              />
              <Input
                placeholder="English Link"
                name="englishLink"
                value={newCourse.englishLink}
                onChange={(e) => {
                  setNewCourse({ ...newCourse, englishLink: e.target.value });
                }}
              />
              <UploadButton
                options={options}
                onComplete={(files) =>
                  setNewCourse({
                    ...newCourse,
                    englishLink: files.map((x) => x.fileUrl).join("\n")
                  })
                }
              >
                {({ onClick }) => (
                  <Button onClick={onClick}>Upload a file...</Button>
                )}
              </UploadButton>
              <Input
                placeholder="Spanish Title"
                name="spanishTitle"
                value={newCourse.spanishTitle}
                onChange={(e) => {
                  setNewCourse({ ...newCourse, spanishTitle: e.target.value });
                }}
              />
              <Input
                placeholder="Spanish Link"
                name="spanishLink"
                value={newCourse.spanishLink}
                onChange={(e) => {
                  setNewCourse({ ...newCourse, spanishLink: e.target.value });
                }}
              />
              <Select
                placeholder="Choose a category"
                name="category"
                value={newCourse.category}
                onChange={(e) => {
                  setNewCourse({ ...newCourse, category: e.target.value });
                }}
              >
                {allCategories?.data?.map((i) => (
                  <option key={i._id}>{i.englishTitle}</option>
                ))}
              </Select>
              <Select
                placeholder="Choose content type"
                name="contentType"
                value={newCourse.contentType}
                onChange={(e) => {
                  setNewCourse({ ...newCourse, contentType: e.target.value });
                }}
              >
                <option>Video</option>
                <option>PDF</option>
              </Select>
              <RadioGroup onChange={setCourseStatus} value={courseStatus}>
                <Flex gap="10">
                  <Radio
                    name="active"
                    value="true"
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, active: e.target.value })
                    }
                  >
                    Active
                  </Radio>

                  <Radio
                    name="active"
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, active: e.target.value })
                    }
                    value="false"
                  >
                    Inactive
                  </Radio>
                </Flex>
              </RadioGroup>

              {newCourse.englishTitle &&
              newCourse.englishLink &&
              newCourse.category &&
              newCourse.contentType &&
              newCourse.active ? (
                <Button colorScheme="blue" type="submit">
                  Create Course
                </Button>
              ) : (
                <Button colorScheme="blue" type="submit" disabled>
                  Create Course
                </Button>
              )}
            </Flex>
          </form>
        </Box>
        <Box flexBasis="100%">
          <Spacer />
          <form onSubmit={createCategory}>
            <Flex flexDirection="column" gap="5" w="100%">
              <Input
                placeholder="English Title"
                name="englishTitle"
                value={newCategory.englishTitle}
                onChange={(e) => {
                  setNewCategory({
                    ...newCategory,
                    englishTitle: e.target.value
                  });
                }}
              />

              <Input
                placeholder="Spanish Title"
                name="spanishTitle"
                value={newCategory.spanishTitle}
                onChange={(e) => {
                  setNewCategory({
                    ...newCategory,
                    spanishTitle: e.target.value
                  });
                }}
              />
              <Input
                placeholder="Category Image"
                name="categoryImage"
                value={newCategory.categoryImage}
                onChange={(e) => {
                  setNewCategory({
                    ...newCategory,
                    categoryImage: e.target.value
                  });
                }}
              />
              <UploadButton
                options={options}
                onComplete={(files) =>
                  setNewCategory({
                    ...newCourse,
                    categoryImage: files.map((x) => x.fileUrl).join("\n")
                  })
                }
              >
                {({ onClick }) => (
                  <Button onClick={onClick}>Upload a file...</Button>
                )}
              </UploadButton>

              {newCategory.englishTitle && newCategory.categoryImage ? (
                <Button colorScheme="blue" type="submit">
                  Create Category
                </Button>
              ) : (
                <Button colorScheme="blue" type="submit" disabled>
                  Create Category
                </Button>
              )}
            </Flex>
          </form>
        </Box>
      </Flex>
      <br />
      <br />
      <Flex gap="5" flexDirection="column" alignItems="center">
        {allCourses?.data?.map((i) => (
          <Flex gap="5" alignItems="center">
            {i.englishTitle}

            {deleteButton !== i._id ? (
              <Button
                colorScheme="red"
                aria-label="Delete Course"
                onClick={() => {
                  setDeleteButton(i._id);
                }}
              >
                Delete
              </Button>
            ) : deleteButton === i._id ? (
              <>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    deleteCourse(i._id);
                    toast({
                      title: `Course "${i.englishTitle}" deleted.`,
                      status: "success"
                    });
                  }}
                >
                  Are you sure?
                </Button>

                <Button
                  variant="outline"
                  colorScheme="red"
                  onClick={() => {
                    setDeleteButton("");
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              ""
            )}
          </Flex>
        ))}
      </Flex>
    </main>
  );
}
