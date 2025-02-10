import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns';

const Post = ({ authorName, content, timeStamp, likes, id, authorId }) => {
  const [postLikes, setPostLikes] = useState(likes);
  const [author, setAuthor] = useState({});

  // useEffect(()=>{
  //   console.log(author)
  // },[author])

  async function getAuthor() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER_URL}/author/${authorId}`);
      // console.log(res.data.author)
      setAuthor(() => res.data.author);
    }
    catch (err) {
      console.log('Some Error Occured')
    }
  }
  useEffect(() => {
    getAuthor();
  }, [authorId])
  async function likePost() {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_POST_URL}/likePost`, {
        postId: id
      },
        {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });

      // console.log(res.data);
      setPostLikes(like => like + 1);

    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-md w-[90vw] md:w-full">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-full text-lg font-bold">
            {
              author.details?.photoURL && 
              <img src={author.details.photoURL} alt="" />
            }
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800">{authorName}</h2>
            <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(timeStamp), { addSuffix: true })};</p>
          </div>
        </div>
        <p className="text-gray-700">{content}</p>
        <div className="flex justify-between items-center mt-4 text-gray-600">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-1 hover:text-purple-500" onClick={likePost}>
              <span>&#9829;</span>
              <span>{postLikes}</span>
            </button>
            {/* <button className="flex items-center space-x-1 hover:text-purple-500">
                  <span>&#128172;</span>
                  <span>3</span>
                </button> */}
          </div>
          {/* <button className="hover:text-purple-500">&#128257;</button> */}
        </div>
      </div>
    </>
  )
}

export default Post