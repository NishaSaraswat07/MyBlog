import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import useSWRMutation from "swr/mutation";
import { addPost, postsCachekey } from "../../api-routes/posts";
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';

export default function CreatePost() {
  const router = useRouter();
  const user = useUser();
  const {trigger: addTrigger} = useSWRMutation(postsCachekey, addPost)

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);
    const author = user.email.split('@')[0];

    const newPost = {
      body: editorContent,
      title: titleInput,
      slug: slug,
      user_id: user.id,
      author: author,
      image,
    }
    const {data, error} = await addTrigger(newPost)
    //console.log(data, error)
    //console.log({newPost})
    if(!error){
      router.push(`/blog/${slug}`)
    }
   
  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
