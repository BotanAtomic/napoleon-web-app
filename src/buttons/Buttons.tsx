interface CodeButtonProps {
  onClick: () => void
}

export const CodeButton = ({onClick}: CodeButtonProps) => (
  <div
    className={"flex items-center text-white px-2 my-2 ml-4 rounded-lg hover:bg-white hover:cursor-pointer hover:bg-opacity-10"}
    onClick={onClick}
  >
    <svg className="w-5 h-5"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
    Code
  </div>
)

export const ImportButton = ({onClick}: CodeButtonProps) => (
  <div
    className={"flex items-center text-white px-2 my-2 ml-4 rounded-lg hover:bg-white hover:cursor-pointer hover:bg-opacity-10"}
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg"
         className="h-5 w-5"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         strokeWidth="2">
      <path strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
    Import
  </div>
)

export const ExportButton = ({onClick}: CodeButtonProps) => (
  <div
    className={"flex items-center text-white px-2 my-2 ml-4 rounded-lg hover:bg-white hover:cursor-pointer hover:bg-opacity-10"}
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
    Export
  </div>
)

