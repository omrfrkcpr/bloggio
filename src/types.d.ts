interface AuthModalProps {
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  selectedFormType?: string;
}

interface CustomModalProps {
  children: React.ReactNode;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
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
}

interface CustomButtonProps {
  click: () => void;
  icon: JSX.Element;
  title: string;
}
