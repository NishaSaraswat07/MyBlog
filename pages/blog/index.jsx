import React,{ useState } from 'react'
import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import useSWR, { mutate } from "swr";
import { getPosts, postsCachekey, searchPost } from "../../api-routes/posts";
import { useUser } from '@supabase/auth-helpers-react';
import { dateTime } from "../../utils/dateTime";
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Blog() {

  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  
  mutate(postsCachekey, getPosts)
  
  const { data: { data = [] } = {}} = useSWR(postsCachekey, getPosts)
  //console.log({data})
  const user = useUser()
  console.log(user)

  const onSearch = (e) =>{
    e.preventDefault()
    router.push(`/search?query=${searchQuery}`)
    
}

  return (
    <>
      <form onSubmit={onSearch}>
            <input 
            type="text" 
            placeholder="Search Blog" 
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className={styles.inputInset}/>
        </form>
      <Heading>Blog</Heading>
      <div className={styles.card}>
        {data?.filter((post)=>{
          return searchQuery.toLocaleLowerCase() === '' ? 
          post: post.title.toLocaleLowerCase().includes(searchQuery)
        }).map((post) => (
          <Link
            key={post.id}
            className={styles.link}
            href={`/blog/${post.slug}`}
          >
            <div className={styles.mainCard}>
              <p className={styles.title}>{post.title}</p>
              <Image src={post.image} 
              alt="travelpic" 
              height={200} 
              width={300} 
              priority style={{borderRadius:20}}/>
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
