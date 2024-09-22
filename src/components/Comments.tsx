import React, { useState, useTransition } from "react";
import Form from "./Form";
import { Comment, CommentsProps } from "../types";
import Pagination from "./Pagination";

const Comments = ({ comments }: CommentsProps) => {
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [filteredComments, setFilteredComments] = useState<Comment[]>(comments);
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
  const [commentsPerPage] = useState<number>(50);
  const [isSearchPending, startSearchTransition] = useTransition(); // Transition for search

  const [, setIsSearching] = useState(false); // to make "Searching..." more visible

  const itemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    setValue(e.currentTarget.textContent || "");
    setIsOpen(false);
  };

  const inputClickHandler = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);

    // Start a transition for non-urgent filtering
    startSearchTransition(() => {
      setIsSearching(true);
      setFilteredComments([]); // Immediately clear the comments to show loading state
      const newFilteredComments = comments.filter((comment) =>
        comment.email.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredComments(newFilteredComments); // Set filtered posts after transition
      setIsSearching(false);

      setCurrentPage(1);
    });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the start and end index of comments for the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );

  return (
    <>
      <div className="form">
        <Form
          value={value}
          filteredComments={filteredComments}
          isOpen={isOpen}
          onInputChange={handleInputChange}
          onItemClick={itemClickHandler}
          onInputClick={inputClickHandler}
        />
      </div>
      <ul className="list-group">
        {isSearchPending && <h2 className="top">Searching...</h2>}
        {currentComments.map((comment) => (
          <li key={comment.id} className="list-group-item">
            {comment.email}
          </li>
        ))}
      </ul>
      <Pagination
        commentsPerPage={commentsPerPage}
        totalComments={filteredComments.length} // Use filtered comments length for pagination
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default Comments;
