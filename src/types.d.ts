/* eslint-disable @typescript-eslint/no-explicit-any */
interface AuthModalProps {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  selectedFormType?: string;
}

interface CustomModalProps {
  children: React.ReactNode;
  setModal: (modal: boolean) => void;
  hidden: string;
  modal: boolean;
}

interface LogoProps {
  sx?:
    | { [key: string]: string }
    | {
        display?: string | { [key: string]: string };
        mr?: number | string;
      };
  width?: string;
}

interface HeaderProps {
  textAlign?: string;
  variant?: string;
  sx?: {
    [key: string]: string | number | Record<string, string | number>;
  };
  content?: string;
  noWrap?: boolean;
}

interface BlogCardProps {
  _id?: string;
  userId?: string;
  categoryId: string;
  title: string;
  content: string;
  image: string;
  comments: string[];
  likes: string[];
  countOfVisitors: number;
  createdAt: string;
  categoryName?: string | undefined;
}

type ShowState = boolean;
interface BlogAnalyticsProps {
  likes: string[];
  comments: string[];
  countOfVisitors: number;
  _id?: string;
  userId?: string;
}

interface CommentFormProps {
  comments: string[];
  id?: string;
}

interface PreviewProps {
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  image?: string | undefined;
  category?: string | any;
  type: string;
  blogId?: string | undefined;
}

interface FormTextFieldProps {
  name?: string;
  label?: string;
  type?: string;
  id?: string;
  autoComplete?: string;
  variant?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
}

interface DropDownProps {
  children: React.ReactNode;
  size: string;
  showDrop: boolean;
  setShowDrop: (value: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
}

interface CustomButtonProps {
  click?: () => void;
  icon?: JSX.Element | undefined;
  title?: string;
  className?: string | undefined;
  key?: string | number;
  type?: string | undefined;
  disabled?: boolean;
}

interface UserIdProps {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface CommentProps {
  _id: string;
  blogId: string;
  userId: UserIdProps;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogCommentCardProps {
  commentData: CommentProps;
  blogId: string;
}

interface BlogSettingsProps {
  key: string;
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
  component?: React.ElementType;
  extraProps?: any;
}

interface BlogState {
  randomFirstName?: string;
  randomLastName?: string;
  userImage?: string;
  categoryName?: string;
  _id?: string;
}

interface Blog {
  userId: string;
  categoryId: { name: string };
  title: string;
  content: string;
  image: string;
  comments: any[];
  likes: any[];
  countOfVisitors: number;
  createdAt: string;
}
