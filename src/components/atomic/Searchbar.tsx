import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";

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
  transition: border-color 0.2s ease;

  font-size: 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  font-family: "TBCX", sans-serif;

  &:hover {
    border-color: rgb(147 149 155);
  }

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

const SearchOverlay = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  min-width: 750px;
  max-width: min(300%, calc(100vw - 2rem));
  background: white;
  border: 1px solid rgb(202 202 204);
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1000;
  display: ${(props) => (props.$isVisible ? "block" : "none")};
  margin-top: 0.25rem;
  padding: 0.75rem 0;

  @media (max-width: 544px) {
    width: min(80vw, 460px);
    left: 0;
    transform: translateX(0);
    padding: 0.5rem 0;
    max-height: 70vh;
    min-width: unset;
    right: auto;
  }
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1.25rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #fff5ee90;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 544px) {
    padding: 0.3rem 0.5rem;
    align-items: center;
    justify-content: flex-start;
  }
`;

const CampaignImage = styled.img`
  width: 100px;
  height: 62.5px;
  border-radius: 0.375rem;
  object-fit: cover;
  margin-right: 0.75rem;
  flex-shrink: 0;

  @media (max-width: 544px) {
    width: 60px;
    height: 37.5px;
    margin-right: 0.5rem;
  }
`;

const CampaignInfo = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const CampaignName = styled.h4`
  margin: 0 0 0.125rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: #45260a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 544px) {
    font-size: 0.8rem;
    margin-bottom: 0.05rem;
  }
`;

const CampaignDescription = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #666;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const NoResults = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
`;

interface Campaign {
  id: number;
  title: string;
  description?: string;
  thumbnail_url?: string;
  current_amount?: number;
  goal_amount?: number;
  type?: number;
}

interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Searchbar({ value, onChange, className }: SearchbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const showClearButton = value.length > 0;

  const handleClear = () => {
    onChange("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value.trim().length < 2) {
      setCampaigns([]);
      setIsOpen(false);
      return;
    }

    async function searchCampaigns() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("campaigns")
          .select(
            "id, title, thumbnail_url, current_amount, goal_amount, type, description"
          )
          .ilike("title", `%${value.trim()}%`)
          .limit(10);

        if (error) {
          console.error("Error searching campaigns:", error.message);
          setCampaigns([]);
        } else {
          setCampaigns(data || []);
        }
      } catch (err: unknown) {
        console.error("Unexpected error searching campaigns:", err);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    }

    const searchTimeout = setTimeout(searchCampaigns, 300);
    setIsOpen(true);

    return () => clearTimeout(searchTimeout);
  }, [value]);

  const handleCampaignClick = (campaign: Campaign) => {
    navigate(`/campaign/${campaign.id}`);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInputFocus = () => {
    if (value.trim().length >= 2) {
      setIsOpen(true);
    }
  };

  return (
    <SearchWrapper className={className} ref={searchRef}>
      <SearchBar
        type="search"
        placeholder="ძებნა"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
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

      <SearchOverlay $isVisible={isOpen}>
        {isLoading ? (
          <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
            მოძებნა...
          </div>
        ) : campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <SearchResultItem
              key={campaign.id}
              onClick={() => handleCampaignClick(campaign)}
            >
              <CampaignImage
                src={campaign.thumbnail_url || "/img/piggy404.webp"}
                alt={campaign.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/img/piggy404.webp";
                }}
              />
              <CampaignInfo>
                <CampaignName>{campaign.title}</CampaignName>{" "}
                {campaign.description && (
                  <CampaignDescription>
                    {campaign.description}
                  </CampaignDescription>
                )}
              </CampaignInfo>
            </SearchResultItem>
          ))
        ) : value.trim().length >= 2 ? (
          <NoResults>კამპანია ვერ მოიძებნა</NoResults>
        ) : null}
      </SearchOverlay>
    </SearchWrapper>
  );
}
