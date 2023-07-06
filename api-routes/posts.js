import { supabase } from "@/lib/supabaseClient";
import { uploadImage } from "../utils/uploadImage";
export const postsCachekey = "/api/blogs";

export const getPosts = async () => {
  //Handle get all posts
  const { data, error } = await supabase
  .from("posts")
  .select("* , users(id)")
  //console.log({data,error})

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
export const addPost = async ( _, {arg: newPost} ) => {
  let image = ""

  if(newPost?.image){
    const { publicUrl, error } = await uploadImage(newPost?.image)
    
    if(!error){
      image = publicUrl
    }
  }
  const { data, error } = await supabase
      .from("posts")
      .insert({...newPost, image})
      .select()
      .single()
      //console.log(data, error)
    return {data, error};
}

export const removePost = async (_,{arg: id}) => {
  //Handle remove post here
  
  const { data, error } = await supabase
  .from('posts')
  .delete()
  .eq('id', id)

  return {data, error}
  };

export const editPost = async (_, {arg: updatedPost}) => {
  //Handle edit post here
  let image = updatedPost?.image ?? ""

  const isNewImage = typeof image === "object" && image !== null;
  if(isNewImage){
    const { publicUrl, error } = await uploadImage(updatedPost?.image)
    
    if(!error){
      image = publicUrl
    }
  }
  const { data, error, status } = await supabase
  .from("posts")
  .update({ ...updatedPost, image })
  .eq("id", updatedPost.id)
  .select()
  .single()

  return {data, error, status}
};
