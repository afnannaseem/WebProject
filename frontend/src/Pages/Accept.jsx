import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sendRequest from "../Api Call/apiCalls";
import "../App.css";
const Accept = () => {
    const navigate = useNavigate();
    useEffect(() => {
        sendRequest("/RequestAcceptMessge", "put")
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, [navigate]);
    return (
        <div className="success-container">
            <div className="success-icons">&#10003;</div>
            <div className="success-message">
                Your request has been accepted successfully!
            </div>
        </div>
    );
};
export default Accept;