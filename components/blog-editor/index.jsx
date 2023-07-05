import styles from "./blog-editor.module.css";
import Editor from "@components/editor/editor";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@components/button";
import Input from "@components/input";
import Label from "@components/label";
import Heading from "@components/heading";
import ImageUpload from "@components/upload-image";


export default function BlogEditor({
  
  content = "",
  src = null,
  title = "",
  heading = "",
  onSubmit,
  buttonText = "Submit",
}) {
  const [image, setImage] = useState(src);
  const [editorContent, setEditorJsonContent] = useState(content);
  const [titleInput, setTitleInput] = useState(title);
  
  const router = useRouter();

  const handleOnChange = (content) => {
    setEditorJsonContent(content);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    onSubmit({ editorContent, titleInput, image });
    //setTimeout(function () { location.reload(true); }, 1);
    router.push('/blog');
  };

  return (
    <>
      <Heading>{heading}</Heading>
      <form onSubmit={handleOnSubmit} className={styles.container}>
        <ImageUpload
          src={image}
          onImageUpload={(file) => setImage(file)}
          onReset={() => setImage(null)}
        />
        <Label>Title</Label>
        <Input
          name="title"
          className={styles.titleInput}
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <Editor
          content={content}
          className={styles.editor}
          onChange={handleOnChange}
        />
        <Button className={styles.uploadButton} type="submit">
          {buttonText}
        </Button>
      </form>
    </>
  );
}
