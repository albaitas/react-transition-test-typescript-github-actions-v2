import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  it("renders pagination buttons", () => {
    const mockPaginate = jest.fn();

    render(
      <Pagination
        commentsPerPage={10}
        totalComments={50}
        paginate={mockPaginate}
        currentPage={1}
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls paginate when clicking a pagination button", () => {
    const mockPaginate = jest.fn();

    render(
      <Pagination
        commentsPerPage={10}
        totalComments={50}
        paginate={mockPaginate}
        currentPage={1}
      />,
    );

    fireEvent.click(screen.getByText("2"));

    expect(mockPaginate).toHaveBeenCalledWith(2);
  });
});
