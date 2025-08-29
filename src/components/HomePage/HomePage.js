import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "./image.png"; // โลโก้ของคุณ

function HomePage() {
  const navigate = useNavigate();
  const [inputRoomId, setInputRoomId] = useState("");

  const handleGenerateRoom = () => {
    // Redirect directly to the specific URL
    window.location.href = "https://telemedoa-nihss-apps-projects.vercel.app/room/pjzar409314?type=one-on-one";
  };

  const handleJoinRoom = () => {
    if (inputRoomId.trim()) {
      // Navigate to the room with the entered ID
      navigate(`/room/${inputRoomId.trim()}?type=one-on-one`);
    } else {
      alert("Please enter a valid Room ID");
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <img src={logo} alt="Logo" className="homepage-logo" />
        <h1>Stroke Sight Telemedicine</h1>
        <p>Start or join a video call</p>
        
        <div className="room-controls">
          <h3>Join Default Meeting</h3>
          <p className="meeting-description">Join the standard consultation room</p>
          <button 
            className="generate-join-btn"
            onClick={handleGenerateRoom}
          >
            Generate & Join
          </button>
        </div>

        <div className="room-divider">
          <span>OR</span>
        </div>

        <div className="room-controls">
          <h3>Join Specific Meeting</h3>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
            />
            <button onClick={handleJoinRoom}>Join Meeting</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
