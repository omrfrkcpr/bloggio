interface AuthModalProps {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  selectedFormType?: string;
}

interface BlogCardProps {
  _id?: string;
  // userId: string;
  // categoryId: string;
  title: string;
  content: string;
  image: string;
  comments: string[];
  likes: string[];
  countOfVisitors: number;
  createdAt: string;
  categoryName: string;
}

type ShowState = boolean;
interface BlogAnalyticsProps {
  likes: string[];
  comments: string[];
  countOfVisitors: number;
  show?: ShowState;
  setShow?: React.Dispatch<React.SetStateAction<ShowState>>;
}

interface CommentFormProps {
  comments: string[];
  id?: string;
}
