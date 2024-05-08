import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors()); // 使用 CORS 中间件
app.use(express.json()); // 使用 express.json() 中间件解析 JSON 数据
const port = 3000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// 设置静态资源目录
app.use(express.static(path.join(__dirname, "public")));

// 处理 POST 请求，用于修改 JSON 文件内容
app.post("/updateJson", (req, res) => {
  // 获取res中的参数
  // const { data } = req.body;
  const { data } = req.body; // 从请求体中获取名为 data 的参数值
  console.log("data:", data);

  // const filePath = path.resolve(__dirname, "public", "text.json"); // 获取绝对路径
  let filePath = "./public/text.json"; // 获取绝对路径
  // 修改 JSON 文件内容
  fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }

    let jsonData = JSON.parse(fileData);
    jsonData.text = data; // 修改数据

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        res.status(500).send("Error writing file");
        return;
      }
      res.send("File updated successfully");
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
