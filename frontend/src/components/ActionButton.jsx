import styled from "styled-components";

const ActionButton = styled.button`
    background: linear-gradient(135deg, #4e54c8, #8f94fb); /* Modern gradient */
    color: white;
    padding: 15px 25px;
    font-size: 16px;
    border: none;
    border-radius: 25px;
    margin-top: 30px;
    cursor: pointer;
    width: 100%;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(
            135deg,
            #6a6ff5,
            #8a9ff5
        ); /* Slight hover gradient effect */
        transform: scale(1.05);
    }

    &:disabled {
        background-color: #d1d1d1;
        cursor: not-allowed;
    }
`;

export default ActionButton;
