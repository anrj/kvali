import { useState, useEffect } from "react";
import supabase from "../utils/supabase.ts";
import styled from "styled-components";
import { Card } from "../components/atomic/Card";
import { Button } from "../components/atomic/Button";
import { RiListSettingsLine } from "react-icons/ri";

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

const TabButton = styled(Button)`
  padding: 0.5rem 1rem;
  border-radius: 18px;
  font-size: 0.65rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #5c320e;
  }

  &:focus,
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
}

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    async function fetchCampaigns() {
      const { data, error } = await supabase.from("campaigns").select("*");

      if (error) {
        console.error("Error fetching campaigns:", error);
      } else {
        setCampaigns(data || []);
      }
    }
    fetchCampaigns();
  }, []);

  return (
    <>
      <CampaignsPage>
        <FilterRow>
          <FilterButton icon={<RiListSettingsLine size={16} />}></FilterButton>
          <TabGroup>
            <TabButton>ქველმოქმედება</TabButton>
            <TabButton>ბიზნესი</TabButton>
            <TabButton>სხვა</TabButton>
          </TabGroup>
        </FilterRow>
        <CampaignListContainer>
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              title={campaign.title}
              imageSrc={campaign.thumbnail_url}
              moneyRaised={campaign.current_amount}
              barPercentage={
                Math.round(
                  (campaign.current_amount / campaign.goal_amount) * 10000
                ) / 100
              }
            />
          ))}
        </CampaignListContainer>
      </CampaignsPage>
    </>
  );
}
