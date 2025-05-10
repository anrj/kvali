import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const SkeletonElement = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: string;
  marginBottom?: string;
}>`
  background-color: #e0e0e0;
  border-radius: ${(props) => props.borderRadius || "4px"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "1em"};
  margin-bottom: ${(props) => props.marginBottom || "0"};

  background-image: linear-gradient(
    to right,
    #e0e0e0 0%,
    #f0f0f0 20%,
    #e0e0e0 40%,
    #e0e0e0 100%
  );
  background-repeat: no-repeat;
  background-size: 2000px 100%;
  animation: ${shimmerAnimation} 1.5s linear infinite;
`;

const SkeletonCardContainer = styled.div`
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0.875rem;
  padding-bottom: 1.25rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const SkeletonImageWrapper = styled(SkeletonElement)`
  aspect-ratio: 15 / 10;
  border-radius: 14px;
  margin-bottom: 0;
  flex-shrink: 0;
  height: 64%;
`;

const SkeletonCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const SkeletonCardTitle = styled(SkeletonElement)`
  height: 1.4em;
`;

const SkeletonTextLine = styled(SkeletonElement)`
  height: 1em;
`;

const SkeletonProgressBar = styled(SkeletonElement)`
  height: 10px;
  margin-top: 0.425rem;
  margin-bottom: 0.175rem;
`;

export default function SkeletonCard() {
  return (
    <SkeletonCardContainer>
      <SkeletonImageWrapper />
      <SkeletonCardBody>
        <SkeletonCardTitle width="80%" />
        <SkeletonCardTitle width="60%" />
        <SkeletonProgressBar />
        <SkeletonTextLine width="40%" height="1em" />
      </SkeletonCardBody>
    </SkeletonCardContainer>
  );
}
