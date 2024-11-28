// Компонент для отображения футера страницы
const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 px-20">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-6">
          <ul className="space-y-2">
            <li>
              <span className="hover:none cursor-default">FAQ</span>
            </li>
            <li>
              <span className="hover:none cursor-default">Help Center</span>
            </li>
            <li>
              <span className="hover:none cursor-default">Account</span>
            </li>
            <li>
              <span className="hover:none cursor-default">Media Center</span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <span className="hover:none cursor-default">
                Investor Relations
              </span>
            </li>
            <li>
              <span className="hover:none cursor-default">Jobs</span>
            </li>
            <li>
              <span className="hover:none cursor-default">Netflix Shop</span>
            </li>
            <li>
              <span className="hover:none cursor-default">
                Redeem Gift Cards
              </span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <span className="hover:none cursor-default">Terms of Use</span>
            </li>
            <li>
              <span className="hover:none cursor-default">Privacy</span>
            </li>
            <li>
              <span className="hover:none cursor-default">
                Cookie Preferences
              </span>
            </li>
            <li>
              <span className="hover:none cursor-default">
                Corporate Information
              </span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <span className="hover:none cursor-default">Contact Us</span>
            </li>
            <li>
              <span className="hover:none cursor-default">Speed Test</span>
            </li>
            <li>
              <span className="hover:none cursor-default">Legal Notices</span>
            </li>
            <li>
              <span className="hover:none cursor-default">Only on Netflix</span>
            </li>
          </ul>
        </div>
        <p className="text-sm">© 2024 Netflix, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
