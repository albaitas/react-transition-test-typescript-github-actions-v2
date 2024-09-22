import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";
import { Comment } from "../types";

const mockFilteredComments: Comment[] = [
  { id: 1, email: "user1@example.com", body: "Comment body 1" },
  { id: 2, email: "user2@example.com", body: "Comment body 2" },
];

describe("Form Component", () => {
  it("renders search input and suggestions", () => {
    const mockOnInputChange = jest.fn();
    const mockOnItemClick = jest.fn();

    render(
      <Form
        value="user"
        filteredComments={mockFilteredComments}
        isOpen={true}
        onInputChange={mockOnInputChange}
        onItemClick={mockOnItemClick}
        onInputClick={jest.fn()}
      />,
    );

    expect(
      screen.getByPlaceholderText("Search in the posts..."),
    ).toBeInTheDocument();

    expect(screen.getByText("user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("user2@example.com")).toBeInTheDocument();
  });

  it("triggers onInputChange when typing in the input", () => {
    const mockOnInputChange = jest.fn();

    render(
      <Form
        value=""
        filteredComments={mockFilteredComments}
        isOpen={true}
        onInputChange={mockOnInputChange}
        onItemClick={jest.fn()}
        onInputClick={jest.fn()}
      />,
    );

    const input = screen.getByPlaceholderText("Search in the posts...");

    fireEvent.change(input, { target: { value: "user" } });

    expect(mockOnInputChange).toHaveBeenCalled();
  });
});
