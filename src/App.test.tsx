import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Comment } from "./types";

global.fetch = jest.fn();

const mockFetchSuccess = (comments: Comment[]) => {
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => comments,
  });
};

const mockFetchFailure = () => {
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: false,
  });
};

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('rodo "Loading" pranešimą kraunant duomenis', async () => {
    mockFetchSuccess([]);

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  test("rodo Comments komponentą, kai duomenys sėkmingai užkrauti", async () => {
    const mockComments: Comment[] = [
      { id: 1, email: "jonas", body: "Test comment 1" },
    ];

    mockFetchSuccess(mockComments);

    render(<App />);
    expect(await screen.findByText(/jonas/i)).toBeInTheDocument();
  });

  test("rodo klaidos pranešimą, kai nepavyksta gauti komentarų", async () => {
    mockFetchFailure();

    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/error fetching comments/i)).toBeInTheDocument();
    });
  });
});
