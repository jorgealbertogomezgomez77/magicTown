import React from "react";
import Avatar from "./Avatar";
import Rating from "@material-ui/lab/Rating";
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

import "../styles/components/ReviewCard.scss";
import { userInfo } from "../dummyData";

function ReviewCard({ reviewInfo }) {
  // const [value, setValue] = React.useState(2);
  return (
    <div className="reviewcard">
      <Avatar userInfo={reviewInfo.user} />
      <div className="reviewcard__body">
        <header className="reviewcard__header">
          <div className="reviewcard_stars">
            <h4>{reviewInfo.townName}</h4>{" "}
            <Rating name="read-only" value={reviewInfo.rate} readOnly />
          </div>
        </header>
        <q className="reviewcard__copy"> {reviewInfo.description} </q>
        <div className="author">
          <cite>- {userInfo.username}</cite>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
