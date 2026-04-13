export function Footer() {
  return (
    <footer className="text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-sm font-medium tracking-wide">
          &copy; {new Date().getFullYear()} سكاكر الصباح. جميع الحقوق محفوظة. منذ 1947.
        </p>
      </div>
    </footer>
  );
}
