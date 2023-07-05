import { useRef } from "react";
import Button from "@components/button";
import Input from "@components/input";
import Label from "@components/label";
import TextArea from "@components/text-area";
import styles from "./add-comment.module.css";
import useSWRMutation from "swr/mutation";
import { addComment, commentCachekey} from "../../../../../api-routes/comments";

export default function AddComment({ postId }) {
  const formRef = useRef(); // create a reference
  const {trigger: addTrigger} = useSWRMutation(commentCachekey, addComment)

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // Alternative way to get the form data
    const formData = new FormData(event.target);

    const { author, comment } = Object.fromEntries(formData);

    /* 
      Perhaps a good place to add a comment to the database that is associated with the blog post 😙
      */
      const {status, error} = await addTrigger({author, comment, postId})
      console.log(status, error)
    console.log({ author, comment, postId });
    
    // Reset the form after submission?
    formRef.current.reset();
  };

  return (
    <div className={styles.container}>
      <h2>Add a comment</h2>
      <form ref={formRef} className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.inputContainer}>
          <Label htmlFor="author">Author</Label>
          <Input id="author" name="author" />
        </div>

        <div className={styles.inputContainer}>
          <Label htmlFor="comment">Comment</Label>
          <TextArea id="comment" name="comment" />
        </div>

        <Button className={styles.addCommentButton} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
