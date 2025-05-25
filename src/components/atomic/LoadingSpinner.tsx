import styled from "styled-components";

const Container = styled.div<{ $minHeight?: string; $centered?: boolean }>`
  ${(props) =>
    props.$centered &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: ${props.$minHeight || "50vh"};
    width: 100%;
    background-color: white;
  `}
`;

const Spinner = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #e57e22 94%, #0000) top/8px 8px
      no-repeat,
    conic-gradient(#0000 30%, #e57e22);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: spin 1s infinite linear;

  @keyframes spin {
    100% {
      transform: rotate(1turn);
    }
  }
`;

interface LoadingSpinnerProps {
  size?: number;
  centered?: boolean;
  minHeight?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 50,
  centered = false,
  minHeight = "50vh",
  className,
}: LoadingSpinnerProps) {
  if (centered) {
    return (
      <Container
        $minHeight={minHeight}
        $centered={centered}
        className={className}
      >
        <Spinner $size={size} />
      </Container>
    );
  }

  return <Spinner $size={size} className={className} />;
}
