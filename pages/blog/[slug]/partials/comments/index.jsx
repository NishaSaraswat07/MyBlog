import styles from "./comments.module.css";
import Comment from "../comment";
import useSWR, {mutate} from "swr";
import { getComments , commentCachekey } from '../../../../../api-routes/comments'


export default function Comments({ postId }) {
  /* 
  Here is a good place to fetch the comments from the database that has a 
  foreign key relation to the post.
  */
  mutate(commentCachekey, getComments)
  const {data: {data = []}={}} = useSWR(commentCachekey, getComments)

  return (
    <div className={styles.container}>
      <h2>Comments</h2>

      { 
       data?.map((comment) => (
         
         postId === comment.postId ?
          <Comment key={comment.id} {...comment} /> : null
          
      ))}
    </div>
  );
}
