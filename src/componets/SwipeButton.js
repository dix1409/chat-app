import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import { IconButton } from "@material-ui/core";
import "./SwipeButton.css";
function SwipeButton() {
  return (
    <div className="swipeButton">
      <IconButton>
        <ReplayIcon fontSize="large" className="repeat" />
      </IconButton>
      <IconButton>
        <CloseIcon fontSize="large" className="cross " />
      </IconButton>
      <IconButton>
        <StarRateIcon fontSize="large" className="star" />
      </IconButton>
      <IconButton>
        <FavoriteIcon fontSize="large" className="right" />
      </IconButton>
      <IconButton>
        <FlashOnIcon fontSize="large" className="lightning" />
      </IconButton>
    </div>
  );
}

export default SwipeButton;
