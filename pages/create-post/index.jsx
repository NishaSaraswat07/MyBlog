import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import { supabase } from "@/lib/supabaseClient";

export default function CreatePost() {

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);
      await supabase
      .from('posts')
      .insert({title: titleInput, slug: slug, body: editorContent})
      
    //console.log({ editorContent, titleInput, image, slug });
  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
