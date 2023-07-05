import { supabase } from "@/lib/supabaseClient";
export const commentCachekey = "/api/blogs";

export const getComments = async () => {
  //Handle get all comments
  const { data, error } = await supabase
  .from("comments")
   .select(`* , posts(id)`)
  //console.log({ data, error})
  
  return {data, error}
};

export const addComment = async (_, {arg}) => {
  const {author, comment, postId} = arg
  console.log({arg})
  //Handle add comment here
  const { data, error } = await supabase
  .from('comments')
  .insert({author: author, comment: comment, postId: postId})
  
  return { data, error }

};

export const removeComment = async (_, {arg: id}) => {
  //Handle remove comment here
  console.log(id)
  const { data, error } = await supabase
  .from('comments')
  .delete()
  .eq('id', id)
  return {data, error}
};
