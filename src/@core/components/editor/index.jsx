import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Jodit } from "jodit";
import { useEffect } from "react";
import { FileUpload, getFileById } from "@src/@core/api/file";
import toast from "react-hot-toast";

export const Editor = (props) => {
  const { name, handleChangeText, content, isView } = props;
  const editor = useRef(null);
  const [inputText, setInputText] = useState("");
  const config = {
    disabled: !isView,
    readonly: false,
    tabIndex: 1,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html",

    placeholder: "Write something awesome ...",
    beautyHTML: true,
    toolbarButtonSize: "large",
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "video",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
    ],
    extraButtons: ["uploadImage"],
  };
  const uploadImageButton = () => {
    Jodit.defaultOptions.controls.uploadImage = {
      name: "Upload image to Cloudinary",
      iconURL:
        "https://www.kindpng.com/picc/m/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png",
      exec: async (editor) => {
        await imageUpload(editor);
      },
    };
  };

  const imageUpload = (editor) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async function () {
      const imageFile = input.files[0];

      if (!imageFile) {
        return;
      }

      if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
        return;
      }

      const imageInfo = await FileUpload(imageFile);
      // getFileById(imageInfo.data)
      //   .then((res) => {
      //     insertImage(editor, res.data);
      //   })
      //   .catch((err) => {
      //     toast.error("File upload failed");
      //   });
      const baseUrl = process.env.REACT_APP_ROOT;
      console.log("baseUrl: " + baseUrl);
      const url = `${baseUrl}/ext/files/getFileById?id=${imageInfo.data}`;
      console.log("url: " + url);
      const image = editor.createInside?.element("img");
      console.log("image", image);
      if (image) {
        image.setAttribute("src", url);
        editor.selection.insertNode(image);
      } else {
        toast.error("File upload failed");
      }
    };
  };

  // const insertImage = (editor, url) => {
  //   console.log("ủl laaaa", url);
  //   const image = editor.createInside?.element("img");
  //   image.setAttribute(
  //     "src",
  //     "https://www.shutterstock.com/image-illustration/binary-code-background-digital-abstract-260nw-1255899988.jpg"
  //   );
  //   editor.selection.insertNode(image);
  // };

  uploadImageButton();
  return (
    <Box sx={{ height: "auto" }}>
      <JoditEditor
        ref={editor}
        config={config}
        value={inputText || content}
        onBlur={(newContent) => {
          handleChangeText(name, newContent);
        }}
      />
    </Box>
  );
};
