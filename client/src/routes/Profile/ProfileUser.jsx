import React, { useEffect, useState , useContext} from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import List from "../../components/list/List";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DarkModeContext } from "../../context/DarkModeContext";
import "./ProfileUser.scss";

function ProfileUser() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(DarkModeContext);
  const [ratingData, setRatingData] = useState({
    ratedValue: null,
    avgRating: 0,
    numberOfRatings: 0,
    showRating: false,
  });
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [userDataResponse, userPostsResponse, userRatingResponse] = await Promise.all([
          apiRequest.get(`/users/${userId}`),
          apiRequest.get(`/posts/user/${userId}`),
          apiRequest.get(`/users/${userId}/my-rating`)
        ]);

        const { avgRating, numberOfRatings, ...userData } = userDataResponse.data;
        setUser(userData);
        setUserPosts(userPostsResponse.data);

        setRatingData({
          ratedValue: userRatingResponse.data.rating,
          avgRating: avgRating !== undefined ? avgRating : 0,
          numberOfRatings: numberOfRatings !== undefined ? numberOfRatings : 0,
          showRating: false,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleRating = async (rating) => {
    try {
      const response = await apiRequest.post(`/users/${userId}/rate`, { rating });
      toast.success("Rating submitted successfully!");

      setRatingData((prev) => ({
        ...prev,
        ratedValue: rating,
        avgRating: response.data.avgRating,
        numberOfRatings: response.data.numberOfRatings,
        showRating: false,
      }));
    } catch (error) {
      console.error("Error submitting rating:", error);
      setError("Error submitting rating. Please try again later.");
      toast.error("Failed to submit rating.");
    }
  };

  const handleShowRating = () => {
    setRatingData((prev) => ({ ...prev, showRating: true }));
    toast.info("Please rate this user:");
  };

  return (
    <div className={`profileUser ${darkMode ? "dark-mode" : ""}`}>
      <ToastContainer />
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
          </div>
          <div className="info">
            {loading ? (
              <p>Loading user information...</p>
            ) : (
              user && (
                <>
                  <div className="avatar-username-container">
                    <div className="avatar-container">
                      <img
                        src={user.avatar || "/noavatar.jpg"}
                        alt="Avatar"
                        className="avatar"
                      />
                    </div>
                    <div className="user-details">
                      <span className="username">
                        <b>{user.username}</b>
                      </span>
                    </div>
                  </div>
                  <div className="user-details">
                    <span className="email">
                      <img src="/email-icon.png" className="user-icon" alt="" />
                      <b>{user.email}</b>
                    </span>
                    <span className="rating">
                      <img src="/rating-icon.png" className="user-icon" alt="" />
                      <b>
                        {ratingData.avgRating
                          ? ratingData.avgRating.toFixed(1)
                          : "N/A"}
                        /5
                      </b>{" "}
                      ({ratingData.numberOfRatings} ratings)
                    </span>
                    <span className="user-rating">
                      Your Rating:{" "}
                      {ratingData.ratedValue !== null ? (
                        <Rater
                          total={5}
                          rating={ratingData.ratedValue}
                          onRate={({ rating }) => handleRating(rating)}
                          style={{ fontSize: 30, color: "yellow" }}
                        />
                      ) : !ratingData.showRating ? (
                        <button onClick={handleShowRating} className="rateButton">
                          Add a Rating
                        </button>
                      ) : (
                        <div className="ratingContainer">
                          <Rater
                            total={5}
                            rating={0}
                            onRate={({ rating }) => handleRating(rating)}
                            style={{ fontSize: 30, color: "yellow" }}
                          />
                        </div>
                      )}
                    </span>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
      <div className="userPosts">
        <div className="wrapper">
          <div className="title">
            <h1>User Posts</h1>
          </div>
          <div className="postsList">
            {loading ? (
              <p>Loading user posts...</p>
            ) : (
              <List posts={userPosts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
