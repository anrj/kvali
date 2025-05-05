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

  &:focus, &:active {
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

export default function CampaignList() {
  return (
    <>
    <CampaignsPage>
      <FilterRow>
        <FilterButton icon={<RiListSettingsLine size={16}/>}></FilterButton>
        <TabGroup>
          <TabButton>ქველმოქმედება</TabButton>
          <TabButton>ბიზნესი</TabButton>
          <TabButton>სხვა</TabButton>
        </TabGroup>
      </FilterRow>
      <CampaignListContainer>
        <Card imageSrc="/assets/img/test.jpg" title="დამეხმარე" barPercentage={12} moneyRaised={5000} />
        <Card imageSrc="/assets/img/test.jpg" title="დამეხმარე ავიდე სილვერში და დავამარცხო ალეგაციები" barPercentage={88} moneyRaised={223} />
        <Card imageSrc="/assets/img/test2.jpg" title="მომეცი ფული ფული მომეცი ფული მინდა ფული ჩამირიცხე ფული" barPercentage={56} moneyRaised={300} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={24} moneyRaised={3455} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={37} moneyRaised={107.80} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={43} moneyRaised={40000} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={89} moneyRaised={2567} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={3} moneyRaised={567} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={3} moneyRaised={567} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={3} moneyRaised={567} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={3} moneyRaised={567} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={3} moneyRaised={567} />
        <Card imageSrc="/assets/img/test2.jpg" title="მომეცი ფული ფული მომეცი ფული მინდა ფული ჩამირიცხე ფული" barPercentage={56} moneyRaised={300} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={24} moneyRaised={3455} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={37} moneyRaised={107.80} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={43} moneyRaised={40000} />
        <Card imageSrc="/assets/img/test.jpg" title="ტესტი" barPercentage={89} moneyRaised={2567} />
      </CampaignListContainer>
    </CampaignsPage>
    </>
  );
};