import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import useSWR, { mutate } from "swr";
import { getPosts, postsCachekey } from "../../api-routes/posts";
import { useUser } from '@supabase/auth-helpers-react';
import { dateTime } from "../../utils/dateTime";

export default function Blog() {

  mutate(postsCachekey, getPosts)
  
  const { data: { data = [] } = {}} = useSWR(postsCachekey, getPosts)
  //console.log({data})
  const user = useUser()
  console.log(user)
  
  return (
    <>
      <Heading>Blog</Heading>
      <div className={styles.card}>
        {data?.map((post) => (
          <Link
            key={post.id}
            className={styles.link}
            href={`/blog/${post.slug}`}
          >
            <div className={styles.mainCard}>
              <p className={styles.title}>{post.title}</p>
              <div className={styles.date}>
                <p className={styles.author}>{post.author}</p>
                <time className={styles.date}>{dateTime(post.created_at)}</time>
              </div>
            </div>
          </Link>
          ))}
      </div>
    </>
  );
}
