import { supabase } from "@/lib/supabaseClient";
export const usersCachekey = "api/blogs";

export const getUsers = async () => {
  //Handle get authenticated user information

  const { data, error } = await supabase.auth.admin.getUser()
  // const { data: { users }, error } = await supabase.auth.admin.listUsers()
  console.log({users})
return {data, error}
};
