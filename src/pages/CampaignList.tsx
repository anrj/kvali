import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import supabase from "../utils/supabase.ts";
import styled from "styled-components";
import { Card } from "../components/atomic/Card";
import Button from "../components/atomic/Button";
import { RiListSettingsLine } from "react-icons/ri";
import SkeletonCard from "../components/atomic/SkeletonCard.tsx";

const CampaignsPage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FilterRow = styled.div`
  display: flex;
  padding-top: 1.3rem;
  margin-bottom: 0.5rem;
  gap: 0.5rem;

  border-top: 1px dotted #45260a60;
`;

const FilterButton = styled(Button)`
  // ADD A SIDEBAR FOR FILTERING OPTIONS
  padding: 0.5rem;
  margin-left: 5.5rem;
  background-color: #e0e0e0;
  color: #0e0e0e;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const TabGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const TabButton = styled(Button)<{ $isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 18px;
  font-size: 0.65rem;
  transition: all 0.2s ease-in-out;

  background-color: ${(props) => (props.$isActive ? "#f3bf92" : "#5c320e")};
  color: ${(props) => (props.$isActive ? "#555555" : "#ffffff")};

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#e0ac82" : "#7a4a2a")};
    color: ${(props) => (props.$isActive ? "#555555" : "#ffffff")};
  }

  &:active {
    background-color: #f3bf92;
    color: #555555;
  }
`;

const CampaignListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 0.8rem;
  grid-row-gap: 0.8rem;
  margin: 0rem 4.6rem;
`;

interface Campaign {
  id: number;
  title: string;
  current_amount: number;
  goal_amount: number;
  thumbnail_url: string;
  type: number;
}

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeParam = searchParams.get("type");
  const activeFilterType =
    typeParam && !isNaN(parseInt(typeParam)) ? parseInt(typeParam) : null;

  // Fetch campaigns from Supabase
  useEffect(() => {
    async function fetchCampaigns() {
      setIsLoading(true);

      try {
        let query = supabase
          .from("campaigns")
          .select(
            "id, title, thumbnail_url, current_amount, goal_amount, type"
          );

        if (activeFilterType !== null) {
          query = query.eq("type", activeFilterType);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching campaigns:", error.message);
          setCampaigns([]);
        } else {
          setCampaigns(data || []);
        }
      } catch (err: unknown) {
        console.error("Unexpected error fetching campaigns:", err);
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCampaigns();
  }, [activeFilterType]);

  const handleFilterChange = (typeValue: number) => {
    if (activeFilterType === typeValue) {
      setSearchParams(
        (prev) => {
          prev.delete("type");
          return prev;
        },
        { replace: true }
      );
    } else {
      setSearchParams({ type: String(typeValue) }, { replace: true });
    }
  };

  const renderSkeletons = () => {
    const skeletonCount = 8;
    return Array.from({ length: skeletonCount }).map((_, index) => (
      <SkeletonCard key={`skeleton-${index}`} />
    ));
  };

  return (
    <>
      <CampaignsPage>
        <FilterRow>
          <FilterButton icon={<RiListSettingsLine size={16} />}></FilterButton>
          <TabGroup>
            <TabButton
              onClick={() => handleFilterChange(1)}
              $isActive={activeFilterType === 1}
            >
              ქველმოქმედება
            </TabButton>
            <TabButton
              onClick={() => handleFilterChange(2)}
              $isActive={activeFilterType === 2}
            >
              ბიზნესი
            </TabButton>
            <TabButton
              onClick={() => handleFilterChange(3)}
              $isActive={activeFilterType === 3}
            >
              სხვა
            </TabButton>
          </TabGroup>
        </FilterRow>
        <CampaignListContainer>
          {isLoading
            ? renderSkeletons()
            : campaigns.map((campaign) => (
                <Card
                  id={campaign.id}
                  key={campaign.id}
                  title={campaign.title}
                  imageSrc={campaign.thumbnail_url}
                  moneyRaised={campaign.current_amount}
                  barPercentage={
                    campaign.goal_amount > 0
                      ? Math.round(
                          (campaign.current_amount / campaign.goal_amount) *
                            10000
                        ) / 100
                      : 0
                  }
                />
              ))}
        </CampaignListContainer>
      </CampaignsPage>
    </>
  );
}
