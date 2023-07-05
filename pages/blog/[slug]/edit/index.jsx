import { useRouter } from "next/router";
import BlogEditor from "../../../../components/blog-editor";
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { createSlug } from "@/utils/createSlug";
import { getPost, editPost, postsCachekey } from "../../../../api-routes/posts";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";


export default function EditBlogPost() {
  const router = useRouter();
  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;
  const {data: {data: post = {}} = {}, error } = useSWR(slug? `${postsCachekey}${slug}`: null, 
  () => getPost({slug}))

  const {trigger: editPostTrigger} = useSWRMutation( `${postsCachekey}${slug}`, editPost)
  
  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const updatedSlug = createSlug(titleInput)
    const updatedPost = {
      id: post.id,
      body: editorContent,
      title: titleInput,
      slug: updatedSlug,
    }

    const {data, error} = await editPostTrigger(updatedPost)
    console.log({updatedPost});
    console.log({data, error});
  };

  return (
    <BlogEditor
      heading="Edit blog post"
      title={post.title}
      src={post.image}
      alt={post.title}
      content={post.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx)
  const { slug } = ctx.params

  const { data: { session }, } = await supabase.auth.getSession()

  const {data} = await supabase.from("posts")
  .select()
  .single()
  .eq('slug', slug)

  // console.log(data)
  const isAuthor = data.user_id === session.user.id
  //console.log(isAuthor)
  if(!isAuthor){
    return{
      redirect: {
        destination: `/blog/${slug}`,
        permanent: true,
      }
    }
  }
  return {
    props: {},
}
}