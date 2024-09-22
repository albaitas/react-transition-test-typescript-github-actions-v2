export interface Comment {
  id: number;
  email: string;
  body: string;
}

export interface CommentsProps {
  comments: Comment[];
}

export interface FormProps {
  value: string;
  filteredComments: Comment[];
  isOpen: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  onInputClick: () => void;
}

export interface PaginationProps {
  commentsPerPage: number;
  totalComments: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}
