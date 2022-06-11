
interface OnClickProps {
  onClick: () => void,
}

export const ClearIcon = ({ onClick }: OnClickProps) => (
  <svg onClick={onClick} className="w-4 h-4"
       fill="none"
       stroke="white"
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
)
export const LoadingIcon = () => (
  <svg role="status"
       className="inline w-6 h-6 animate-spin dark:text-gray-700 fill-green-600"
       viewBox="0 0 100 101"
       fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor" />
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill" />
  </svg>
);

export const StartIcon = ({ onClick }: OnClickProps) => (
  <svg onClick={onClick}
       xmlns="http://www.w3.org/2000/svg"
       className="h-6 w-6 cursor-pointer"
       viewBox="0 0 20 20"
       fill="white">
    <path fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clipRule="evenodd" />
  </svg>
);

export const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg"
       className="h-4 w-4"
       fill="none"
       viewBox="0 0 24 24"
       stroke="green"
       strokeWidth="2">
    <path strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7" />
  </svg>
);

export const ErrorIcon = () => (
  <svg className="w-4 h-4"
       fill="none"
       stroke="red"
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

export const ArrowUp = ({ onClick }: OnClickProps) => (
  <svg onClick={onClick}
       className="w-4 h-4"
       fill="none"
       stroke="white"
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
  </svg>
);

export const ArrowDown = ({ onClick }: OnClickProps) => (
  <svg onClick={onClick}
       className="w-4 h-4"
       fill="none"
       stroke="white"
       viewBox="0 0 24 24 "
       xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
  </svg>
);

export const Trash = ({ onClick }: OnClickProps) => (
  <svg onClick={onClick}
       className="w-4 h-4"
       fill="none"
       stroke="white"
       viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
  </svg>
);

export const CloseIcon = ({onClick}: OnClickProps) => (
  <svg  onClick={onClick} className="w-6 h-6"
       fill="red"
       viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"></path>
  </svg>
)
