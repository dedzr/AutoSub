import styled from "styled-components";

const Dropzone = styled.div`
    padding: 60px;
    background-color: #f8f9fa;
    border: 3px dashed #ced4da;
    border-radius: 12px;
    cursor: pointer;
    color: #495057;
    font-size: 18px;
    font-weight: 600;
    transition: background-color 0.3s ease, border 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #e9ecef;
        border-color: #6c757d;
    }

    &:active {
        background-color: #dee2e6;
    }

    @media (max-width: 768px) {
        padding: 40px;
        font-size: 16px;
    }
`;

export default Dropzone;
