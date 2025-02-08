import { useState, useEffect } from "react";
import { MdFileUpload } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import {
  Input,
  InputGroup,
  InputRightElement,
  InputRightAddon,
  Select,
  IconButton,
  Radio,
  RadioGroup,
  Button,
  ButtonGroup,
  Flex,
  FormLabel,
  Switch,
  Box,
  useToast,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  PopoverAnchor
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

  const [state, setState] = useState(false);

  const handleToggle = () => {
    if (newCourse.active) {
      setNewCourse({ ...newCourse, active: false });
    } else {
      setNewCourse({ ...newCourse, active: true });
    }
  };

  const [showSpanishCourse, setShowSpanishCourse] = useState(false);

  const clearCourseForm = () => {
    setShowSpanishCourse(false);
    setNewCourse({
      englishTitle: "",
      spanishTitle: "",
      englishLink: "",
      spanishLink: "",
      category: "",
      contentType: "",
      active: true
    });
  };

  const [allCategories, setAllCategories] = useState([]);

  const [newCategory, setNewCategory] = useState({
    englishTitle: "",
    spanishTitle: "",
    categoryImage: ""
  });

  const [showSpanishCategory, setShowSpanishCategory] = useState(false);

  const clearCategoryForm = () => {
    setShowSpanishCategory(false);

    setNewCategory({
      englishTitle: "",
      spanishTitle: "",
      categoryImage: ""
    });
  };

  const toast = useToast();

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
        clearCourseForm();
        setCourseStatus("true");
        getCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id, name) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        getCourses();
        toast({
          title: `Course "${name}" deleted.`,
          status: "success"
        });
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
        clearCategoryForm();
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

              <InputGroup size="md" gap="3">
                <Input
                  placeholder="English Link"
                  name="englishLink"
                  value={newCourse.englishLink}
                  onChange={(e) => {
                    setNewCourse({ ...newCourse, englishLink: e.target.value });
                  }}
                  type="URL"
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
                    <IconButton icon={<MdFileUpload />} onClick={onClick} />
                  )}
                </UploadButton>
              </InputGroup>

              {showSpanishCourse && (
                <>
                  <Input
                    placeholder="Spanish Title"
                    name="spanishTitle"
                    value={newCourse.spanishTitle}
                    onChange={(e) => {
                      setNewCourse({
                        ...newCourse,
                        spanishTitle: e.target.value
                      });
                    }}
                  />
                  <InputGroup size="md" gap="3">
                    <Input
                      placeholder="Spanish Link"
                      name="spanishLink"
                      value={newCourse.spanishLink}
                      onChange={(e) => {
                        setNewCourse({
                          ...newCourse,
                          spanishLink: e.target.value
                        });
                      }}
                      type="URL"
                    />
                    <UploadButton
                      options={options}
                      onComplete={(files) =>
                        setNewCourse({
                          ...newCourse,
                          spanishLink: files.map((x) => x.fileUrl).join("\n")
                        })
                      }
                    >
                      {({ onClick }) => (
                        <IconButton icon={<MdFileUpload />} onClick={onClick} />
                      )}
                    </UploadButton>
                  </InputGroup>
                </>
              )}

              {!showSpanishCourse && (
                <Button
                  onClick={() => {
                    setShowSpanishCourse(true);
                  }}
                >
                  Add Spanish
                </Button>
              )}

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

              <ButtonGroup>
                <Button
                  flex="1"
                  variant={newCourse.active ? "solid" : "outline"}
                  colorScheme={newCourse.active ? "green" : "gray"}
                  onClick={(e) => setNewCourse({ ...newCourse, active: true })}
                >
                  Active
                </Button>
                <Button
                  flex="1"
                  variant={!newCourse.active ? "solid" : "outline"}
                  colorScheme={!newCourse.active ? "red" : "gray"}
                  onClick={(e) => setNewCourse({ ...newCourse, active: false })}
                >
                  Inactive
                </Button>
              </ButtonGroup>

              {newCourse.englishTitle &&
              newCourse.englishLink &&
              newCourse.category &&
              newCourse.contentType ? (
                <Button colorScheme="blue" type="submit">
                  Create{" "}
                  {newCourse.englishTitle && <>"{newCourse.englishTitle}"</>}{" "}
                  Course
                </Button>
              ) : (
                <Button colorScheme="blue" type="submit" disabled>
                  Create{" "}
                  {newCourse.englishTitle && <>"{newCourse.englishTitle}"</>}{" "}
                  Course
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

              {showSpanishCategory && (
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
              )}

              {!showSpanishCategory && (
                <Button
                  onClick={() => {
                    setShowSpanishCategory(true);
                  }}
                >
                  Add Spanish
                </Button>
              )}

              <InputGroup size="md" gap="3">
                <Input
                  placeholder="Category Image"
                  name="categoryImage"
                  value={newCategory.categoryImage}
                  onChange={(e) => {
                    setNewCourse({ ...newCourse, spanishLink: e.target.value });
                  }}
                  type="URL"
                />
                <UploadButton
                  options={options}
                  onComplete={(files) =>
                    setNewCategory({
                      ...newCategory,
                      categoryImage: files.map((x) => x.fileUrl).join("\n")
                    })
                  }
                >
                  {({ onClick }) => (
                    <IconButton icon={<MdFileUpload />} onClick={onClick} />
                  )}
                </UploadButton>
              </InputGroup>

              {newCategory.englishTitle && newCategory.categoryImage ? (
                <Button colorScheme="blue" type="submit">
                  Create{" "}
                  {newCategory.englishTitle && (
                    <>"{newCategory.englishTitle}"</>
                  )}{" "}
                  Category
                </Button>
              ) : (
                <Button colorScheme="blue" type="submit" disabled>
                  Create{" "}
                  {newCategory.englishTitle && (
                    <>"{newCategory.englishTitle}"</>
                  )}{" "}
                  Category
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
            {i.englishTitle} <b>{i.contentType}</b>
            <Popover>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />

                      <PopoverBody pt="4" pb="4" pl="6" pr="6">
                        Are you sure you want to delete "<b>{i.englishTitle}</b>
                        "?
                      </PopoverBody>
                      <PopoverFooter p="3">
                        <ButtonGroup
                          size="sm"
                          display="flex"
                          justifyContent="flex-end"
                        >
                          <Button variant="outline" onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => {
                              deleteCourse(i._id, i.englishTitle);
                              onClose();
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </>
              )}
            </Popover>
          </Flex>
        ))}
      </Flex>
    </main>
  );
}
