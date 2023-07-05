import Button from "@components/button";
import styles from "./comment.module.css";
import { removeComment, commentCachekey } from "../../../../../api-routes/comments";
import useSWRMutation from "swr/mutation"
import { useUser } from '@supabase/auth-helpers-react';
import { dateTime } from "../../../../../utils/dateTime";


export default function Comment({ comment, created_at, author, id }) {
  const user = useUser();
  const time = dateTime(created_at);

  const {trigger: deleteTrigger} = useSWRMutation( commentCachekey, removeComment )
  const handleDelete = async (id) => {
    //console.log({ id });
    const {status, error} = await deleteTrigger(id)
      //console.log( status,error )
  };

  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{time}</time>
      
      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      <div className={styles.buttonContainer}>
        {user?<Button onClick={()=>handleDelete(id)}>Delete</Button>:null}
      </div>
    </div>
  );
}
