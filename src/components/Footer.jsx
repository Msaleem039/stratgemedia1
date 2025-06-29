import React from 'react';
import { Mail, Phone, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gradient-to-b from-[#0A0F24] to-[#1A2A4A] border-t border-indigo-900/50">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
            StrategemMedia
          </h3>
          <p className="text-blue-100 leading-relaxed max-w-md">
            The AI-Powered Voice of Multilingual Media, revolutionizing digital and traditional platforms with cutting-edge technology.
          </p>
          <div className="mt-6 flex items-center space-x-4">
            <a href="mailto:info@strategemmedia.com" className="flex items-center text-blue-100 hover:text-white transition">
              <Mail className="w-5 h-5 mr-2" />
              <span>Email Us</span>
            </a>
            <a href="tel:+92332558676" className="flex items-center text-blue-100 hover:text-white transition">
              <span>info@strategemmedia.com</span>
            </a>
          </div>
        </div>
        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { label: 'Home', url: '/' },
              { label: 'Caption', url: '/caption' },
              { label: 'Dubbing', url: '/dubbing' },
              { label: 'AI Archiving', url: '/ai-archiving' },
              { label: 'Contact', url: '/contact' }
            ].map((item) => (
              <li key={item.url}>
                <a href={item.url} className="text-blue-100 hover:text-white transition flex items-center group">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition"></span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Social & Legal */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-6">
            Connect With Us
          </h3>
          <div className="flex space-x-4">
            {[
              { icon: <Twitter className="w-5 h-5" />, name: 'Twitter' },
              { icon: <Facebook className="w-5 h-5" />, name: 'Facebook' },
              { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn' },
              { icon: <Instagram className="w-5 h-5" />, name: 'Instagram' }
            ].map((social) => (
              <a 
                key={social.name}
                href="#" 
                className="text-blue-100 hover:text-white p-2 hover:bg-blue-900/30 rounded-full transition"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-blue-900/50">
            <h4 className="text-sm font-semibold text-blue-300 mb-3">Legal</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-blue-100">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-16 pt-8 border-t border-blue-900/50 text-center">
        <p className="text-sm text-blue-300">
          © {new Date().getFullYear()} StrategemMedia Technologies. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer; 