import { useState, useEffect } from "react";

const Fetch = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
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
        setNewTitle("");
        setNewBody("");
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
        <h2 className="text-xl font-bold decoration-stone-950 mb-3 sm:mb-0">Title</h2>
        <div>
          <button className="bg-stone-950 text-white text-sm font-semibold px-4 py-2 mr-3 cursor-pointer rounded-full">
            Filter
          </button>
          <button
            className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 cursor-pointer rounded-full"
            onClick={() => setIsModalOpen(true)}
          >
            Add Item
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (

        // main data display
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {currentPosts.map((post) => (
            <div key={post.id} className="p-5 bg-white rounded-2xl">
              <h2 className="text-lg font-bold decoration-stone-950">
                {post.title}
              </h2>
              <p className="text-sm decoration-stone-950">{post.body}</p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          className="modal-overlay fixed top-0 left-0 w-screen h-full bg-gray-900/75 transition-opacity flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal bg-white relative p-5 rounded-2xl min-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold decoration-stone-950">
                Create New Cart{" "}
              </h3>
              <span
                className="close text-2xl cursor-pointer decoration-stone-950"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </span>
            </div>

            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Header"
              className="border-0 rounded-full outline-0 bg-gray-100 w-full text-sm decoration-stone-950 font-semibold p-3 mb-2"
            />
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Description"
              className="border-0 rounded-xl outline-0 bg-gray-100 w-full text-sm decoration-stone-950 font-semibold p-3"
            ></textarea>

            <span className="block bg-gray-100 w-full h-[1px] my-3"></span>
            <button
              className="bg-gray-600 text-white text-sm font-semibold rounded-full p-2 w-full cursor-pointer ransition-all"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      )}



      {/* Paginations */}
      <div className="flex justify-between items-center mt-4 gap-2 flex-wrap">
        <span className="text-sm font-semibold text-gray-400">
          {currentPage} of {totalPages} Records
        </span>
        <div className="ml-auto">
          <button
            className="p-1 text-sm font-semibold text-gray-400"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`p-1 text-sm font-semibold ${
                currentPage === index + 1
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="p-1 text-sm font-semibold text-gray-400"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fetch;
