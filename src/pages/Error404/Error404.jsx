import React from "react";

const Error404 = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "700px" }}>
      <div className="container">
        <div className="text-center" style={{ color: "#173d77" }}>
          <div style={{ fontSize: "150px", fontWeight: "700" }}>404</div>
          <div style={{ fontSize: "44px" }}>Page not found!</div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
