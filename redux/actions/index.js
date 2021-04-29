import firebase from "firebase";

import { USER_FEED_STATE_CHANGE } from "../constants/index";

export function fetchPosts() {
  return (dispatch) => {
    let posts = [];

    firebase
      .firestore()
      .collection("reviews")
      .orderBy("postTime", "desc")
      .get()
      .then((querySnapshot) => {
        // console.log('Total Posts: ', querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const {
            userId,
            post,
            postImg,
            postTime,
            rating,
            userImage,
            userName,
          } = doc.data();
          posts.push({
            id: doc.id,
            userId: userId,
            userName: userName,
            userImg: userImage,
            postTime: postTime,
            post: post,
            postImg: postImg,
            rating: rating,
          });
        });
        dispatch({ type: USER_FEED_STATE_CHANGE, posts });
      });
  };
}
