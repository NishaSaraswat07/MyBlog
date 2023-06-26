import { supabase } from "@/lib/supabaseClient";

export const getComments = async () => {
  //Handle get all comments
  const { data, error } = await supabase.from("comments").select("*")

  console.log({ data, error})
  return { data, error}
};

export const addComment = async () => {
  //Handle add comment here
  const { data, error } = await supabase
  .from("comments")
  .select("*")
  
};

export const removeComment = () => {
  //Handle remove comment here
};
