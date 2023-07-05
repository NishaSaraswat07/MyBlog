import { useRouter } from "next/router";
import BlogEditor from "../../../../components/blog-editor";
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { createSlug } from "@/utils/createSlug";
import { getPost, editPost, postsCachekey } from "../../../../api-routes/posts";


// const mockData = {
//   title: "Community-Messaging Fit",
//   body: "<p>This is a good community fit!</p>",
//   image:
//     "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg",
// };
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
