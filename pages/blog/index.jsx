import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import useSWR, { mutate } from "swr";
import { getPosts, postsCachekey } from "../../api-routes/posts";
import { useUser } from '@supabase/auth-helpers-react';

export default function Blog() {
  mutate(postsCachekey, getPosts)
  const { data: { data = [] } = {}} = useSWR(postsCachekey, getPosts)
  //console.log({data})
  const user = useUser()
  console.log(user)
  return (
    <>
      <Heading>Blog</Heading>
      {data?.map((post) => (
        <Link
          key={post.id}
          className={styles.link}
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p>{post.title}</p>
            <time className={styles.date}>{post.user_id}</time>
          </div>
        </Link>
      ))}
    </>
  );
}
