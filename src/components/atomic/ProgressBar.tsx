import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${props => props.$percentage}%;
  background-color: #e57e22;
  background-image: linear-gradient(to right, #eca666, #e47819);
  border-radius: 5px; 
  transition: width 0.4s ease-in-out; 
  max-width: 100%;
`;

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export function ProgressBar({ percentage, className }: ProgressBarProps) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <ProgressBarContainer className={className}>
      <ProgressFill $percentage={clampedPercentage}/>
    </ProgressBarContainer>
  );
}
