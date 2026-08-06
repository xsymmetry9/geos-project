const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="font-secondary w-full border-t border-brand-dark/20 bg-brand py-5 text-sm text-white">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-1 px-4 text-center">
        <p>&copy; GEOS Online Language Academy. All Rights Reserved.</p>
        <p className="text-white/80">Created by Gary – {date}</p>
      </div>
    </footer>
  );
};

export default Footer;
