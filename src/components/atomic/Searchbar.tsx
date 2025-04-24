import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";

// need to be more of a component template to be reusable

const IconBase = styled.div`
  position: absolute;
  right: 0.9rem;
  width: 1rem;
  height: 1rem;
  color: rgb(34 34 34);
`;

const SearchIcon = styled(IconBase)`
  user-select: none;
  pointer-events: none;
`;

const ClearButtonIcon = styled(IconBase)`
  cursor: pointer;
`;

const SearchBar = styled.input`
  background: floralwhite;
  border-radius: 0.75rem;
  padding: 0rem 1.25rem;
  height: 2.5rem;
  border: 1px solid rgb(202 202 204);
  width: 100%;
  color: rgb(34 34 34);
  font-size: 1rem;

  font-weight: 500;
  font-size: 0.875rem;
  font-family: "TBCX", sans-serif;

  &:focus {
    outline: none;
    border-color: rgb(147 149 155);

    &::placeholder {
      color: rgb(128 128 128);
    }
  }

  &::placeholder {
    color: rgb(34 34 34);
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 24%;
`;

interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Searchbar({ value, onChange, className }: SearchbarProps) {
  const showClearButton = value.length > 0;

  const handleClear = () => {
    onChange("");
  };

  return (
    <SearchWrapper className={className}>
      <SearchBar
        type="search"
        placeholder="ძებნა"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {!showClearButton ? (
        <SearchIcon>
          <GoSearch size={16} />
        </SearchIcon>
      ) : (
        <ClearButtonIcon onClick={handleClear} role="button">
          <IoClose size={16} />
        </ClearButtonIcon>
      )}

    </SearchWrapper>
  );
}
