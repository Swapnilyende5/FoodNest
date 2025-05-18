import { useContext, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import ToastMessage from "../../components/common/ToastMessage";
import { RestaurantContext } from "../../context/restaurantContext";

const AddFeedback = () => {
    const { userDetails, resIdForFeedback } = useContext(RestaurantContext)
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const username = userDetails.userName
            const useremail = userDetails.email
            const res = await axiosInstance.post("/feedback/addfeedback", {
                restaurantId: resIdForFeedback,
                username,
                useremail,
                rating,
                comment,
            });
            if (res.data.success) {
                setRating(5);
                setComment("");
                setErrorMsg("");

                const toast = document.getElementById("toast");
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 3000);
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="container my-4">
            <h5>Leave Feedback</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="form-control"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Comments</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Feedback</button>
                {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
                <ToastMessage message={"Feedback submitted successfully!"} />
            </form>
        </div>
    );
};

export default AddFeedback;
