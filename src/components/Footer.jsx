import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <h3 className="font-black text-2xl text-gray-900 italic mb-6">Skill<span className="text-blue-600">Sphere</span></h3>
             <p className="text-sm text-gray-500 leading-relaxed">
               Redefining online education with practical, job-focused learning. Join thousands of students globally.
             </p>
          </div>
          
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-900 mb-6">Contact</h4>
            <p className="text-sm text-gray-500 mb-2">support@skillsphere.com</p>
            <p className="text-sm text-gray-500">0195767-8900</p>
          </div>

          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link href="/courses" className="hover:text-blue-600">Courses</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-900 mb-6">Follow Us</h4>
            <div className="flex gap-4">
              {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                <Link key={i} href="xyz" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400 hover:text-blue-600 hover:shadow-lg transition-all border border-gray-100">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <p>© {new Date().getFullYear()} SkillSphere</p>
          <div className="flex gap-8">
             <Link href="/terms" className="hover:text-gray-900">Terms</Link>
             <Link href="/cookies" className="hover:text-gray-900">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;