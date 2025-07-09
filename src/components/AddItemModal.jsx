import React from "react";
import Button from "./Button";

const AddItemModal = ({ isOpen, onOpenChange, newTitle, setnewTitle,newBody,setnewBody, onSubmit }) => {
    if (!isOpen) return null;
  return (
     
        <div
          className="modal-overlay fixed top-0 left-0 w-screen h-full bg-gray-900/75 transition-opacity flex justify-center items-center"
         onClick={() => onOpenChange(false)}
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
               onClick={() => onOpenChange(false)}
              >
                &times;
              </span>
            </div>

            <input
              type="text"
              value={newTitle}
                onChange={(e) => setnewTitle(e.target.value)}
              placeholder="Header"
              className="border-0 rounded-full outline-0 bg-gray-100 w-full text-sm decoration-stone-950 font-semibold p-3 mb-2"
            />
            <textarea
              value={newBody}
              onChange={(e) => setnewBody(e.target.value)}
              placeholder="Description"
              className="border-0 rounded-xl outline-0 bg-gray-100 w-full text-sm decoration-stone-950 font-semibold p-3"
            ></textarea>

            <span className="block bg-gray-100 w-full h-[1px] my-3"></span>
            <button
              className="bg-gray-600 text-white text-sm font-semibold rounded-full p-2 w-full cursor-pointer ransition-all"
              onClick={onSubmit}
            >
              Create
            </button>
          </div>
        </div>
     

    // <Dialog open={isOpen} onOpenChange={onOpenChange}>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Add New Item</DialogTitle>
    //     </DialogHeader>
    //     <div className="mb-4">
    //       <input
    //         type="text"
    //         value={newTitle}
    //         onChange={(e) => setnewTitle(e.target.value)}
    //         placeholder="Enter new item"
    //         className="border p-2 rounded w-full"
    //       />
    //     </div>
    //     <DialogFooter>
    //       <Button >Submit</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
};

export default AddItemModal;
