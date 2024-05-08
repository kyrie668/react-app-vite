import React, { useEffect, useState } from "react";
import "./index.less";
import "react-quill/dist/quill.snow.css"; //引入样式css
import { Image, Modal } from "antd";
import { useRef } from "react";

const formatStr = (str) => {
  return str;
  return str.replace(/<img\s+src="([^"]+)"\s+width="([^"]+)"\s*>/g, '<Image src="$1" width="$2"></Image>');
};

function Shop() {
  const [open, setOpen] = useState(false);
  const [picSrc, setPicSrc] = useState("");
  const picRef = useRef(null);
  useEffect(() => {
    // 给css类名为ql-editor下的所有img标签添加点击事件，点击时打印src地址
    const imgs = document.querySelectorAll(".ql-editor img");
    imgs.forEach((img) => {
      img.addEventListener("click", () => {
        console.log(img.src);
        setOpen(true);
        setPicSrc(img.src);
        setTimeout(() => {
          console.log("picRef.current", picRef.current);
          picRef.current?.click();
        }, 0);
      });
    });
  }, []);
  let str = `<p class="ql-align-center"><img src="data:image/png;base64,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" width="134"><img src="data:image/png;base64,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" width="567" style="cursor: nwse-resize;"></p><p>417171<a href="https://juejin.cn/" rel="noopener noreferrer" target="_blank">27272727277</a>47475</p><p class="ql-align-right"><a href="https://juejin.cn/" rel="noopener noreferrer" target="_blank">27272727277</a></p>`;
  console.log("str", formatStr(str));

  const handleCloseModal = (visible) => {
    if (!visible) {
      setOpen(false);
      setPicSrc("");
    }
  };
  return (
    <>
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: formatStr(str) }} />
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

export default Shop;
