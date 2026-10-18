import { ImageResponse } from "next/og";

export const alt = "Jabran Khan — Full Stack AI Mobile Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05080e",
          color: "#e9f0f7",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#38d9f5" }}>
          FULL STACK AI MOBILE ENGINEER
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>
            Jabran Khan
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#ffb547" }}>
            Web, mobile, and production AI systems
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a6b4c4" }}>
          React Native · Node.js · Express.js · MongoDB · LLMs
        </div>
      </div>
    ),
    { ...size },
  );
}
