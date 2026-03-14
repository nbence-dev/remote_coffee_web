import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#e8dfd6] mt-16">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/nbence-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b5444] hover:text-[#4a2c1a] transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/nicholasbence20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b5444] hover:text-[#4a2c1a] transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm text-[#6b5444]">
            © {new Date().getFullYear()} Remote Coffee Spots. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
