// src/components/Header.js
import React from "react";
import styled from "styled-components";

// Simple, clean header with a soft background
const HeaderContainer = styled.header`
    padding: 20px 0;
    background-color: #f9fafb; /* Soft background color */
    color: #333; /* Dark text for readability */
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* Subtle shadow */
`;

// Modern, sans-serif font for a sleek look
const HeaderTitle = styled.h1`
    font-size: 36px;
    font-weight: 600;
    color: #2d3748; /* Dark gray color */
    font-family: "Helvetica Neue", sans-serif;
    margin: 0;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderTitle>AutoSub</HeaderTitle>
        </HeaderContainer>
    );
};

export default Header;
