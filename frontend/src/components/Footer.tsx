const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="font-primary w-full bg-gray-600 py-4 text-sm text-white">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-1 px-4 text-center">
        <p>&copy; GEOS Online Language Academy. All Rights Reserved.</p>
        <p>Created by Gary – {date}</p>
      </div>
    </footer>
  );
};

export default Footer;
