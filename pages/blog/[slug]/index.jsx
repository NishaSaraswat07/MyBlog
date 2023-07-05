import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import styles from "./blog-post.module.css";
import Comments from "./partials/comments";
import AddComment from "./partials/add-comment";
import Button from "@components/button";
import Heading from "@components/heading";
import BlogImageBanner from "@components/blog-image-banner";
import useSWR, { mutate } from "swr"
import useSWRMutation from "swr/mutation"
import { getPost, postsCachekey, removePost } from "../../../api-routes/posts";
import { useUser } from '@supabase/auth-helpers-react';
import { dateTime } from "../../../utils/dateTime";


export default function BlogPost() {
  const user = useUser();
  const router = useRouter();
  
  
  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;
  const {data: {data: post = {}} = {},error,status} = useSWR(slug ? `${postsCachekey}${slug}` : null, () => 
  getPost({slug}))
  
  const {trigger: deleteTrigger} = useSWRMutation(postsCachekey, removePost )
  let time = dateTime(post.created_at)

  const handleDeletePost = async (id) => {
    console.log(id)
    const {error} = await deleteTrigger(id)
    router.push('/blog');
  };
  
  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`);
  };

  return (
    <>
      <section className={styles.container}>
            <Heading key={post.id}>
              {post.title}
            </Heading>
            {post?.image && <BlogImageBanner src={post.image} alt={post.title} />}
                <div className={styles.dateContainer}>
                  <time className={styles.date}>Created On: {time}</time>
                  <div className={styles.border} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
                <span className={styles.author}>Author: {post.author}</span>
                <div className={styles.buttonContainer}>
              {user?<Button onClick={()=>handleDeletePost(post.id)}>Delete</Button>:null}
              {user?<Button onClick={handleEditPost}>Edit</Button>:null}
        </div>
        
        {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
        
      </section>

      <Comments postId={post.id} authorId={post.user_id} /> 

      {/* This component should only be displayed if a user is authenticated */}
      {user?<AddComment postId={post.id} />:null}
    </>
  );
}
