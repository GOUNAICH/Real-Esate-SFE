import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/DarkModeContext";
import "./card.scss";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest";

function Card({ item }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const [saved, setSaved] = useState(() => {
    const savedState = localStorage.getItem(`saved_${item.id}`);
    return savedState ? JSON.parse(savedState) : item.isSaved || false;
  });

  useEffect(() => {
    localStorage.setItem(`saved_${item.id}`, JSON.stringify(saved));
  }, [item.id, saved]);

  const handleCardClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      toast.warn("You need to log in to view this post!");
      navigate("/login");
    }
  };

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className={`card ${darkMode ? "dark-mode" : ""}`}>
      <Link to={`/${item.id}`} className="imageContainer" onClick={handleCardClick}>
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`} onClick={handleCardClick}>
            {item.title}
          </Link>
        </h2>
        <p className="address">
          <img src="/adress.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "rgba(0, 0, 0, 0)",
              }}
            >
              <img src="/save.png" alt="" onClick={handleCardClick} />
              {saved ? "Saved" : "Save"}
            </button>
            <div className="icon">
              <Link to={`/comments/${item.userId}/${item.id}`} onClick={handleCardClick}>
                <img src="/comment.png" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
