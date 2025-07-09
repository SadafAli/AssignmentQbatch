import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import AddItemModal from "./AddItemModal";
import PostsList from "./PostsList";
import Pagination from "./Pagination";

const Fetch = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setnewTitle] = useState("");
  const [newBody, setnewBody] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!newTitle) return;
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle, body: newBody }),
        }
      );
      if (response.ok) {
        const createdItem = await response.json();
        setPosts((prevItems) => [createdItem, ...prevItems]);
        setnewTitle("");
        setnewBody("");
        setIsModalOpen(false);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* top bar */}
      <div className="flex flex-col sm:justify-between items-center sm:flex-row mb-4">
        <h2 className="text-xl font-bold decoration-stone-950 mb-3 sm:mb-0">
          Title
        </h2>
        <div>
          <Button variant="secondary" className="mr-3">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </Button>
          <Button onClick={() => setIsModalOpen(true)} variant="primary">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Item
          </Button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // main data display
        <PostsList posts={currentPosts} />
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <AddItemModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        newTitle={newTitle}
        setnewTitle={setnewTitle}
        newBody={newBody}
        setnewBody={setnewBody}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Fetch;
