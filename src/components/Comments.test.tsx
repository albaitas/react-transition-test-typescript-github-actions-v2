import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Comments from "./Comments";
import { Comment } from "../types";

const mockComments: Comment[] = [
  { id: 1, email: "user1@example.com", body: "Comment body 1" },
  { id: 2, email: "user2@example.com", body: "Comment body 2" },
  { id: 3, email: "user3@example.com", body: "Comment body 3" },
];

describe("Comments Component", () => {
  it("filters comments based on search input", async () => {
    render(<Comments comments={mockComments} />);

    const input = screen.getByPlaceholderText("Search in the posts...");

    fireEvent.change(input, { target: { value: "user2" } });

    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");

      const filteredComment = listItems.find(
        (item) => item.textContent === "user2@example.com",
      );
      expect(filteredComment).toBeInTheDocument();
    });

    expect(screen.queryByText("user1@example.com")).toBeNull();
    expect(screen.queryByText("user3@example.com")).toBeNull();
  });
});
