const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
    const url = req.body.url;
    if (!url) return res.json({ error: "URL kosong" });

    const cmd = `yt-dlp -f "bv*[height<=1080]+ba/best" --merge-output-format mp4 "${url}"`;

    exec(cmd, { timeout: 600000 }, (err) => {
        if (err) return res.json({ error: "Gagal memproses video" });
        res.json({ success: "Video berhasil diproses" });
    });
});

app.get("/", (req, res) => {
    res.send("Backend aktif");
});

app.listen(3000, () => console.log("Server running"));
