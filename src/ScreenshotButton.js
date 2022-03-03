import React, { useCallback } from "react";
import { toBlob, toPng } from "html-to-image";
import axios from "axios";

const ScreenshotButton = (props) => {
  const onButtonClick = useCallback(() => {
    if (props.target.current === null) {
      return;
    }
    toBlob(props.target.current, { cacheBust: true })
      .then((dataUrl) => {
        postImage(dataUrl);
        // const link = document.createElement("a");
        // console.log(link);
        // link.download = "test-image.png";
        // link.href = dataUrl;
        // link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.target]);

  async function postImage(blob) {
    const formData = new FormData();
    const file = new File([blob], "whateverfilename.png", { type: "image/png" });
    formData.append("image", file);
    const result = await axios.post("/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result.data;
  }

  return (
    <>
      <button onClick={onButtonClick}>Click me</button>
    </>
  );
};

export default ScreenshotButton;
