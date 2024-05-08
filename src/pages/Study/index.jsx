import React, { useState, useEffect } from "react";
import "./index.less";
import RichComponents from "../../components/RichComponents";
import RichView from "../../components/RichView";

function Study() {
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch("/text.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setContent(data.text);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <RichComponents content={content} onValueChange={(value) => setContent(value)} height={"auto"}></RichComponents>
      <RichView content={content}></RichView>
    </>
  );
}

export default Study;
