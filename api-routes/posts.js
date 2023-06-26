import { supabase } from "@/lib/supabaseClient";
export const postsCachekey = "/api/blogs";

export const getPosts = async () => {
  //Handle get all posts
  const { data, error } = await supabase.from("posts").select("*")
  // console.log({data,error})

  return {data, error}
  
};

export const getPost = async ({ slug }) => {
  //Handle get post here
  const { data, error, status } = await supabase
  .from("posts")
  .select("*")
  .single()
  .eq("slug", slug)
  
  // console.log({data,error})
  return { data, error, status }
};
export const addPost = async (post) => {
  //Handle add post here
  const { data,error, status} = await supabase
  .from("posts")
  .insert({post})

  return { data, error, status }
};

export const removePost = () => {
  //Handle remove post here
};

export const editPost = () => {
  //Handle edit post here
};
