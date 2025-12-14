const Footer = () => {
  return (
    <footer
      className="text-center py-3 mt-5"
      style={{
        background: "linear-gradient(135deg, #fff1b8, #ffe7a3, #fff7d9)",
        borderTop: "1px solid #f0d28a",
      }}
    >
      <p style={{ color: "#b57600", fontWeight: "600", marginBottom: "4px" }}>
        🍭 Peace Sweet — Bringing Happiness One Bite at a Time
      </p>

      <small style={{ color: "#9a6c00" }}>
        © {new Date().getFullYear()} Sweet Shop System | All Rights Reserved
      </small>
    </footer>
  );
};

export default Footer;
