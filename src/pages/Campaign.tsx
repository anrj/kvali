import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { ProgressBar } from "../components/atomic/ProgressBar";
import Button from "../components/atomic/Button";
import LoadingSpinner from "../components/atomic/LoadingSpinner";

const CampaignContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 4rem;
  border-top: 1px dotted #45260a60;
`;

const CampaignHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CampaignImage = styled.img`
  width: 800px;
  height: 500px;
  object-fit: cover;
  border-radius: 16px;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

const CampaignInfo = styled.div`
  display: flex;
  position: sticky;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  height: fit-content;
  min-width: 475px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const CampaignTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  color: #140e0e;
  margin: 0;
  line-height: 1.2;
`;

const OrginizedBy = styled.span`
  margin: 1rem 0;
  font-size: 0.825rem;
  color: #333;
  font-weight: 500;
`;

const CampaignContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 800px;
`;

const CampaignDescriptionHeader = styled.span`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #333;
  font-weight: 700;
`;

const CampaignDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
`;

const CampaignStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatLabel = styled.span`
  font-size: 1rem;
  color: #666;
`;

const StatValue = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #140e0e;
`;

const MoneyAmount = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #e57e22;
`;

const DonateButton = styled(Button)`
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background-color: #e57e22;
  margin-top: 1rem;

  &:hover {
    background-color: #cf711f;
  }
`;

interface Campaign {
  id: number;
  title: string;
  description: string;
  current_amount: number;
  goal_amount: number;
  thumbnail_url: string;
  created_at: string;
  // TODO: add trigger to db when campaign is created use profiles id as fk in campaigns table
  // organizer_id: string;
}

export default function Campaign() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaign() {
      if (!id) {
        setError("Invalid campaign ID");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            setError("Campaign not found");
          } else {
            setError("Failed to load campaign");
          }
          console.error("Error fetching campaign:", error);
        } else {
          setCampaign(data);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaign();
  }, [id]);

  if (loading) {
    return (
      <CampaignContainer>
        <LoadingSpinner centered />
      </CampaignContainer>
    );
  }

  if (error || !campaign) {
    navigate("/404", { replace: true });
    return null;
  }

  const progressPercentage =
    Math.round((campaign.current_amount / campaign.goal_amount) * 10000) / 100;

  return (
    <CampaignContainer>
      <CampaignHeader>
        <CampaignContent>
          <CampaignImage src={campaign.thumbnail_url} alt={campaign.title} />
          <CampaignDescriptionHeader>
            კამპანიის შესახებ:
          </CampaignDescriptionHeader>
          <CampaignDescription>{campaign.description}</CampaignDescription>
          <OrginizedBy>
            ორგანიზებულია: {campaign.created_at.split("T")[0]}
            <br />
            ორგანიზატორი: თენგიზ ბოკელავაძე {/* TODO: */}
          </OrginizedBy>
        </CampaignContent>
        <CampaignInfo>
          <CampaignTitle>{campaign.title}</CampaignTitle>

          <CampaignStats>
            <MoneyAmount>
              ₾{campaign.current_amount.toLocaleString()}
            </MoneyAmount>
            <ProgressBar percentage={progressPercentage} />

            <StatRow>
              <StatLabel>შეგროვდა:</StatLabel>
              <StatValue>{progressPercentage}%</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>მიზანი:</StatLabel>
              <StatValue>₾{campaign.goal_amount.toLocaleString()}</StatValue>
            </StatRow>
          </CampaignStats>

          <DonateButton>ფულის შეწირვა</DonateButton>
        </CampaignInfo>
      </CampaignHeader>
    </CampaignContainer>
  );
}
