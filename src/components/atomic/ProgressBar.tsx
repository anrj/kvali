import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #e57e22;
  background-image: linear-gradient(to right, #e57e22, #eda059);
  border-radius: 5px; 
  transition: width 0.4s ease-in-out; 
  max-width: 100%;
`;

interface ProgressBarProps {
  percentage: number;
}

export function ProgressBar({ percentage }: ProgressBarProps) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <ProgressBarContainer>
      <ProgressFill progress={clampedPercentage} />
    </ProgressBarContainer>
  );
}
