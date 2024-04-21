function LoadingPage() {
  const outerBarStyle = {
    width: "100%",
    height: "4px",
    backgroundColor: "#ddd",
  };

  const innerBarStyle = {
    height: "100%",
    width: "50%",
    backgroundColor: "primary",
    animation: "move 2s linear infinite",
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={outerBarStyle}>
        <div style={innerBarStyle}></div>
      </div>
      <p>Loading...</p>

      <style>
        {`
            @keyframes move {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}
      </style>
    </div>
  );
}
export default LoadingPage;
