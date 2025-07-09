import React from "react";
import Button from "./Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center mt-4 gap-2 flex-wrap">
        <span className="text-sm font-semibold text-gray-400">
          {currentPage} of {totalPages} Records
        </span>
        <div className="ml-auto">
          <button
            className="p-1 text-sm font-semibold text-gray-400"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
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
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>

    // <div className="flex justify-between items-center mt-4 gap-2 flex-wrap">
    //   <Button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
    //     First
    //   </Button>
    //   <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
    //     Previous
    //   </Button>
    //   {[...Array(totalPages)].map((_, index) => (
    //     <button
    //       key={index + 1}
    //       onClick={() => onPageChange(index + 1)}
    //       className={`px-3 py-1 rounded border ${
    //         currentPage === index + 1
    //           ? "bg-blue-600 text-white"
    //           : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    //       }`}
    //     >
    //       {index + 1}
    //     </button>
    //   ))}
    //   <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
    //     Next
    //   </Button>
    //   <Button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
    //     Last
    //   </Button>
    // </div>
  );
};

export default Pagination;
