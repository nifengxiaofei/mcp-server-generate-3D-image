import fs from "fs";
import { ChatOpenAI } from "@langchain/openai";
import fetch from "node-fetch";
// 从env获取
// import dotenv from "dotenv";
// dotenv.config();

// 应该会自动获取到获取环境变量
// const apiUrl = process.env.OPENAI_API_KEY || "";
// const apiKey = process.env.OPENAI_BASE_URL || "";

function extractImageUrl(content: any) {
  const urlMatch = content.match(/!\[image\]\((https?:\/\/[^\)]+)\)/);
  return urlMatch ? urlMatch[1] : null;
}
/**
 * 3Dpicture 类用于处理 3D 图片生成
 */
export class ThreeDPicture {
  /**
   * 生成 3D 图片
   * @param url 原始图片的链接
   * @param text 需要打印在 3D 图片底部的文本内容（可选）
   * @returns 包含生成结果的对象
   */
  async generate_3Dpicture(
    url: string,
    text?: string
  ): Promise<{ success: boolean; resultUrl?: string; message: string }> {
    try {
      // 这里应该添加实际的 3D 图片生成逻辑
      // 例如调用外部 API 或使用图形处理库

      console.error(
        `生成 3D 图片，原始链接: ${url}${text ? "，文本: " + text : ""}`
      );

      const text_buttom = text;
      const prompt = `
      将场景中的角色转化为Q版人物形象，3D黏土风，是真实世界的光影，
      保留人物细节，包括服装和造型。整体放在一张拍立得照片中，有一只手握着拍立得相纸。图中角色从拍立得相纸中，突破边框，延伸进入现实世界的二维空间。
      背景延续拍立得中的背景，Q版风格，背景不需要再有人物出现，仅作为拍立得中背景的延展，与照片原始场景一致。
      拍立得底部文字是:${text_buttom}
      `;

      // const prompt = `
      // 将这张照片转换成吉卜力工作室风格，保持人物特征可识别，但使用宫崎骏标志性的水彩画风格、柔和色调和细腻的细节。
      // 添加典型的吉卜力元素如自然光线、温暖的色彩和梦幻般的氛围。
      // `;

      // 从URL获取图片数据并编码为base64
      let imageData;
      if (url.startsWith("http")) {
        // 网络URL，使用fetch获取
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`无法获取图片，HTTP状态码: ${response.status}`);
        }
        const buffer = await response.buffer();
        imageData = buffer.toString("base64");
      } else {
        // 本地文件路径，使用fs读取
        imageData = fs.readFileSync(url).toString("base64");
      }

      // 初始化ChatOpenAI模型
      const llm = new ChatOpenAI({
        modelName: "gpt-4o-all",
        temperature: 0,
        maxTokens: 8192,
      });

      // 构建消息
      const messages = [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageData}`,
              },
            },
          ],
        },
      ];

      let imageUrl = "";
      try {
        // 调用LLM并获取响应
        const response = await llm.invoke(messages);
        console.error(response);

        // 从响应中提取图片URL
        imageUrl = extractImageUrl(response.content);
        console.error("提取的图片URL:");
        console.error(imageUrl);
      } catch (error) {
        console.error("调用API时出错:", error);
      }

      // 返回模拟结果
      // 在真实实现中，这应该返回实际生成的 3D 图片链接
      return {
        success: true,
        resultUrl: imageUrl,
        message: "3D 图片生成成功",
      };
    } catch (error) {
      console.error("生成 3D 图片时出错:", error);
      return {
        success: false,
        message: `生成 3D 图片失败: ${
          error instanceof Error ? error.message : String(error)
        }`,
      };
    }
  }
}
