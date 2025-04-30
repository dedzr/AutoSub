import styled from "styled-components";

const DownloadButton = styled.a`
    display: block;
    margin-top: 30px;
    padding: 15px 25px;
    background: #34bfa3; /* Fresh modern green */
    color: white;
    text-decoration: none;
    font-size: 16px;
    border-radius: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #28a689; /* Darker green on hover */
    }
`;

export default DownloadButton;
