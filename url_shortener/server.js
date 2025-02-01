import http from "http";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

// Variables
const PORT = 3001;
const DATA_FILE = path.join("data", "links.json");

// Helper functions
const readData = async (res, filePath, contentType) => {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    res.writeHead(200, "Read File Successfully", {
      "Content-Type": contentType,
    });
    res.end(file);
  } catch (error) {
    res.writeHead(404, "Unable to Read File", {
      "Content-Type": contentType,
    });
    res.end("Unable to Read File");
  }
};

const loadLinksFromData = async () => {
  try {
    const response = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(response);
  } catch (error) {
    if (error.errno == -4058) {
      console.log("No links file Found");
      return await fs.writeFile(DATA_FILE, JSON.stringify({}));
    } else {
      throw new Error("Error while loading links from file", error);
    }
  }
};

const saveLinks = async (data) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data));
  } catch (error) {
    throw new Error("Error while saving links", error);
  }
};

// Creating Server
const server = http.createServer(async (req, res) => {
  console.log(req.url);

  if (req.method === "GET") {
    if (req.url === "/") {
      return await readData(
        res,
        path.join("public", "index.html"),
        "text/html"
      );
    } else if (req.url === "/style.css") {
      return await readData(res, path.join("public", "style.css"), "text/css");
    } else if (req.url === "/getLinks") {
      const existingLinks = (await loadLinksFromData()) || {};
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(existingLinks));
    } else {
      const existingLinks = await loadLinksFromData();
      const shortCode = req.url.slice(1);

      if (existingLinks[shortCode]) {
        res.writeHead(302, {
          location: existingLinks[shortCode],
        });
        return res.end();
      }

      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      return res.end("Short Url not found");
    }
  }

  if (req.method === "POST") {
    if (req.url === "/shorten") {
      const existingLinks = (await loadLinksFromData()) || {};
      let body = "";

      req.on("data", (chunks) => (body += chunks));

      req.on("end", async () => {
        const data = JSON.parse(body);
        const { url, shortUrl } = data;

        if (!url) {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("Url not found");
        }

        const shortCode = shortUrl || crypto.randomBytes(4).toString("hex");

        if (existingLinks[shortCode] === url) {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("Url Already Present");
        }

        existingLinks[shortCode] = url;
        await saveLinks(existingLinks);
        res.writeHead(200, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify({ success: true, shortUrl: shortCode }));
      });

      req.on("error", () => {
        console.log("Error while post data in server");
      });
    }
  }
});

server.listen(PORT, () => {
  console.log(`🔥 Server is listening to Port ${PORT}`);
});
