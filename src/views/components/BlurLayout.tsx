import React from "react";
import styled from "styled-components";

const BlurLayout: React.FC<{ children: React.ReactNode; loading: boolean }> = ({
    children,
    loading,
}) => {
    return (
        <BlurScreen className="position-relative" $state={loading}>
            {loading && (
                <div className="fade show position-absolute w-100 h-100 zIndex-1">
                    <div
                        className="spinner-border spero-text-primary position-absolute top-50 start-50"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {children}
        </BlurScreen>
    );
};

export default BlurLayout;
const BlurScreen = styled.div<{ $state: boolean }>`
  filter: ${({ $state }) => ($state ? "blur(2px)" : "unset")};
  transition: all 0.2s ease-in-out 0.2s;
`;
