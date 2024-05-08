import React, { useEffect, useState } from "react";
import "./index.less";
import "react-quill/dist/quill.snow.css"; //引入样式css
import { Image, Modal } from "antd";
import { useRef } from "react";

function RichView({ content }) {
  const [open, setOpen] = useState(false);
  const [picSrc, setPicSrc] = useState("");
  const picRef = useRef(null);
  const richRef = useRef(null);
  useEffect(() => {
    // 获取richRef下的所有img标签添加点击事件
    const imgs = richRef.current.querySelectorAll("img");
    imgs.forEach((img) => {
      img.addEventListener("click", () => {
        console.log(img.src);
        setOpen(true);
        setPicSrc(img.src);
      });
    });
  }, [content]);

  const handleCloseModal = (visible) => {
    if (!visible) {
      setOpen(false);
      setPicSrc("");
    }
  };
  return (
    <>
      <div ref={richRef} className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
          setPicSrc("");
        }}
        onOk={() => {
          setOpen(false);
          setPicSrc("");
        }}
        destroyOnClose={true}
        wrapClassName="pic-madal"
        footer={null}
      >
        <Image
          src={picSrc}
          ref={picRef}
          preview={{
            onVisibleChange: handleCloseModal,
          }}
        ></Image>
      </Modal>
    </>
  );
}

export default RichView;
