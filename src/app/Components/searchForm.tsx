import React, { FormEvent, useState, ChangeEvent } from "react";

interface SearchFormProps {
  onSubmit?: (query: string) => void;
  placeholder?: string;
  buttonText?: string;
  className?: string;
  showButton?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  placeholder = "Search...",
  buttonText = "Search",
  className = "",
  showButton = true,
}) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(query);
    }
    console.log("Searching for:", query);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`search-form ${className}`} role="search">
      <div className="search-input-wrapper">
        <SearchIcon />
        <input
          type="text"
          name="search"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search"
        />
      </div>
    </form>
  );
};

const SearchIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 -0.5 25 25"
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`search-icon ${className}`}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.989 15.4905L19.5 19.0015"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchForm;
