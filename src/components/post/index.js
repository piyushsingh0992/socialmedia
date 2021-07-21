import React, { useState } from "react";
import { useStyles } from "./style.js";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CommentBox from "../commentBox";
import PostHeader from "../postHeader";
import CommentList from "../commentList";
import PostActionButtons from "../postActionButtons";
import moment from 'moment'


export default function Post({ postDetails }) {
  
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleExpandClick = () => {
    setExpanded((value) => !value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <PostHeader
        handleClick={handleClick}
        handleClose={handleClose}
        anchorEl={anchorEl}
        userDetails={postDetails.user}
        time={moment(postDetails.createdAt).format('LL')}
      />
      <CardMedia
        className={classes.media}
        image={postDetails.img.url}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {postDetails.caption}
        </Typography>
      </CardContent>
      <PostActionButtons
        handleExpandClick={handleExpandClick}
        likes={postDetails.likes.length}
        comment={postDetails.comments.length}
      />
      <CommentList expanded={expanded} />
      <CommentBox />
    </Card>
  );
}
