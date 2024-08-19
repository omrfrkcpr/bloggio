/* eslint-disable @typescript-eslint/no-explicit-any */

// General Types
type SxType = { [key: string]: string | number | SxType };

/* ---------------------------------- */
/*            Modal Props             */
/* ---------------------------------- */
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

/* ---------------------------------- */
/*        Logo and Header Props       */
/* ---------------------------------- */
interface LogoProps {
  sx?: SxType;
  width?: string;
  alt?: string;
  onClick?: () => void;
}

interface HeaderProps {
  textAlign?: string;
  variant?: string;
  sx?: SxType;
  content?: string;
  noWrap?: boolean;
  alt?: string;
  onClick?: () => void;
}

/* ---------------------------------- */
/*       Image and Button Props       */
/* ---------------------------------- */
interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
  [x: string]: any;
}

interface CustomButtonProps {
  click?: () => void;
  icon?: JSX.Element;
  title?: string;
  className?: string;
  key?: string | number;
  type?: string;
  disabled?: boolean;
  alt?: string;
}

/* ---------------------------------- */
/*             Blog Props             */
/* ---------------------------------- */

interface BlogCardProps {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
  };
  categoryId: {
    _id: string;
    name: string;
  };
  title: string;
  content: string;
  image: string;
  likes: string[];
  tags: string[];
  countOfVisitors: number;
  blogDetails: {
    countOfLikes: number;
    countOfComments: number;
    readTime: string;
    contentPrev: string;
  };
  updatedAt: string;
  createdAt: Date;
}

interface Category {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BlogAnalyticsProps {
  blogDetails: {
    countOfLikes: number;
    countOfComments: number;
    readTime: string;
    contentPrev: string;
  };
  likes: string[];
  countOfVisitors: number;
  _id?: string;
  userId?: string;
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
  component?: React.ComponentType<any>;
  extraProps?: Record<string, any>;
}

interface BlogState {
  categories: Category[];
  blogs: BlogCardProps[];
  singleBlog: BlogCardProps | null;
  trendings: Blog[];
  comments: CommentProps[];
  saved: BlogCardProps[];
  loading: boolean;
  error: boolean;
  totalPage: number;
}

interface Blog {
  _id: string;
  userId: User;
  categoryId: Category;
  title: string;
  content: string;
  image: string;
  comments: CommentProps[];
  likes: string[];
  countOfVisitors: number;
  createdAt: string;
}

/* ---------------------------------- */
/*            Comment Props           */
/* ---------------------------------- */
interface CommentFormProps {
  comments: CommentProps[];
  id?: string;
}

interface CommentProps {
  _id: string;
  blogId: string;
  userId: UserIdProps;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

/* ---------------------------------- */
/*             User Props             */
/* ---------------------------------- */

interface User {
  _id?: string;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar?: string;
  bio?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  isStaff?: boolean;
  createdAt?: string;
  updatedAt?: string;
  saved?: string[];
}

interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: boolean;
  token: string | null;
}

interface UserIdProps {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

/* ---------------------------------- */
/*            Preview Props           */
/* ---------------------------------- */
interface PreviewProps {
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  image?: string;
  category?: string | any;
  type: string;
  blogId?: string;
}

interface PrevState {
  title: string;
  content: string;
  image?: string;
  categoryId: string;
  isPublish?: boolean;
  tags?: string[];
}

/* ---------------------------------- */
/*             Auth Props             */
/* ---------------------------------- */
interface AuthTextFieldProps {
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
  alt?: string;
}

/* ---------------------------------- */
/*           Dropdown Props           */
/* ---------------------------------- */
interface DropDownProps {
  children: React.ReactNode;
  size: string;
  showDrop: boolean;
  setShowDrop: (value: boolean) => void;
}

/* ---------------------------------- */
/*                News                */
/* ---------------------------------- */

interface Article {
  id?: string;
  author?: string;
  title: string;
  text?: string;
  summary: string;
  image?: string;
  url?: string;
  publish_date?: string;
  authors?: string[];
}

/* ---------------------------------- */
/*               Contact              */
/* ---------------------------------- */

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  feedback: string;
}

interface ContactState {
  form: ContactFormState;
  loading: boolean;
  error: boolean;
}

/* ---------------------------------- */
/*               Others               */
/* ---------------------------------- */

interface PageProps {
  label: string;
  path: string;
  id: number;
}

interface FieldToEdit {
  field: string;
  value: string;
  text: string;
}
