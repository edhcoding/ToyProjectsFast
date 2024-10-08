import FollowingBox from "components/following/FollowingBox";
import useTranslation from "components/hooks/useTranslation";
import AuthContext from "context/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "firebaseApp";
import { PostProps } from "pages/home";
import { useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const t = useTranslation();

  const imageRef = ref(storage, post?.imageUrl);

  const toggleLike = async () => {
    const postRef = doc(db, "posts", post.id);

    if (user?.uid && post?.likes?.includes(user?.uid)) {
      // 사용자가 좋아요를 미리 한 경우 => 좋아요 취소
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
        likeCount: post?.likeCount ? post.likeCount - 1 : 0,
      });
    } else {
      // 사용자가 좋아요를 하지 않은 경우 => 좋아요 추가
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid),
        likeCount: post?.likeCount ? post.likeCount + 1 : 1,
      });
    }
  };

  const handleDelete = async () => {
    // 스토리지 이미지 먼저 삭제 로직
    // 파일 삭제 - https://firebase.google.com/docs/storage/web/delete-files?hl=ko&_gl=1*8ke4f7*_up*MQ..*_ga*MjA2MDI5MjYwOS4xNzI2MTI3ODQ4*_ga_CW55HF8NVT*MTcyNjEyNzg0Ny4xLjAuMTcyNjEyNzg0Ny4wLjAuMA..#delete_a_file
    if (post?.imageUrl) {
      deleteObject(imageRef).catch((e) => console.log(e));
    }

    const confirm = window.confirm("해당 게시글을 삭제 하시겠습니까?");

    if (confirm) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  return (
    <div className="post__box" key={post?.id}>
      <div className="post__box-profile">
        <div className="post__flex">
          {post?.profileUrl ? (
            <img
              src={post.profileUrl}
              alt="profile"
              className="post__box-profile-img"
            />
          ) : (
            <FaUserCircle className="post__box-profile-icon" />
          )}
          <div className="post__flex--between">
            <div className="post__flex">
              <div className="post__email">{post?.email}</div>
              <div className="post__createdAt">{post?.createdAt}</div>
            </div>
            <FollowingBox post={post} />
          </div>
        </div>
        <Link to={`/posts/${post?.id}`}>
          <div className="post__box-content">{post?.content}</div>
          {post?.imageUrl && (
            <div className="post__image-div">
              <img
                src={post?.imageUrl}
                alt="post img"
                className="post__image"
                width={100}
                height={100}
              />
            </div>
          )}
          <div className="post-form__hashtags-outputs">
            {post?.hashTags?.map((tag, i) => (
              <span className="post-form__hashtags-tag" key={i}>
                #{tag}
              </span>
            ))}
          </div>
        </Link>
      </div>
      <div className="post__box-footer">
        {user?.uid === post?.uid && (
          <>
            <button
              type="button"
              className="post__delete"
              onClick={handleDelete}
            >
              {t("BUTTON_DELETE")}
            </button>
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>{t("BUTTON_EDIT")}</Link>
            </button>
          </>
        )}
        <button type="button" className="post__likes" onClick={toggleLike}>
          {user && post?.likes?.includes(user.uid) ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
          {post?.likeCount || 0}
        </button>
        <button type="button" className="post__comments">
          <FaRegComment />
          {post?.comments?.length || 0}
        </button>
      </div>
    </div>
  );
}
