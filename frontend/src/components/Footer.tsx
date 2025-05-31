const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#00646c] text-white font-primary text-sm py-4">
      <div className="max-w-[1100px] mx-auto px-4 flex flex-col items-center gap-1 text-center">
        <p>&copy; GEOS Online Language Academy. All Rights Reserved.</p>
        <p>Created by Gary – {date}</p>
      </div>
    </footer>
  );
};

export default Footer;
