import React, { useEffect, useMemo, useRef, useState } from "react";

import Quill from "quill";
import ReactQuill from "react-quill";
// import ImageResize from "quill-image-resize-module"; //图片裁剪
import "quill-image-resize-module/image-resize.min.js";
import "react-quill/dist/quill.snow.css"; //引入样式css
import { Button } from "antd";

const fs = require("fs");
const path = require("path");

// 注入modules
// Quill.register("modules/ImageResize", ImageResize);
// Quill.register("modules/ImageDrop", ImageDrop);

const DEFAULT_HEIGHT = "auto"; //富文本输入框默认高度
const DEFAULT_WIDTH = "100%"; //富文本输入框默认宽度
/**
 * @Description: quill富文本编辑器组件
 */
const QuillRichEditor = ({ content, width, height, onValueChange, dataUrl = "http://localhost:3000/updateJson" }) => {
  const refs = useRef(null);
  const [valueText, setValue] = useState("");
  const [widthText, setWidth] = useState("");
  const [heightText, setHeight] = useState("");

  const handleSaveData = () => {
    fetch(dataUrl, {
      method: "POST",
      body: JSON.stringify({
        data: valueText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("File updated successfully");
        } else {
          console.error("Failed to update file");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // 保存数据
  const handleSaveHtml = (newValue) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  // 自定义配置
  const modules = useMemo(
    // useMemo: 解决自定义失焦问题
    () => ({
      // imageResize: {
      //   displayStyles: {
      //     backgroundColor: "black",
      //     border: "none",
      //     color: "white",
      //   },
      //   modules: ["Resize", "DisplaySize", "Toolbar"],
      // },
      // ImageDrop: true,
      // 工具栏配置
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
          // [/**'blockquote',*/ "code-block"], // 引用，代码块
          ["link", "image" /**'video' */], // 上传链接、图片、上传视频
          [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
          [{ list: "ordered" }, { list: "bullet" }], // 列表 有序列表、无序列表
          [{ script: "sub" }, { script: "super" }], // 上下标
          [{ indent: "-1" }, { indent: "+1" }], // 缩进
          // [{ direction: 'rtl' }], // 文本方向
          // [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
          [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
          [{ font: [] }], // 字体
          [{ align: [] }], // 对齐方式
          ["clean"], // 清除字体样式
        ],
      },
    }),
    []
  );

  // 默认属性配置
  const options = {
    placeholder: "请输入内容...",
    theme: "snow",
    readOnly: false, // 是否只读
    className: "ql-editor", //组件要加上(className=“ql-editor”)样式类名,否则空格不回显
    onChange: handleSaveHtml,
    value: valueText,
    modules: modules,
    ref: refs,
    style: {
      width: widthText,
      height: heightText,
      overflow: "hidden",
      // borderBottom: "1px solid #ccc",
      paddingBottom: "40px",
    },
  };
  useEffect(() => {
    setValue(content || "");
    setWidth(width || DEFAULT_WIDTH);
    setHeight(height || DEFAULT_HEIGHT);
  }, [content, width, height]);

  return (
    <>
      <ReactQuill {...options} />
      <Button onClick={handleSaveData}>sumbit</Button>
    </>
  );
};

export default QuillRichEditor;
