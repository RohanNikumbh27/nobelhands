import { Heart, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <span className="text-xl">Nobel Hands</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              A platform dedicated to ending hunger by empowering everyone to contribute,
              no matter how small the amount.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#donate-section" className="text-background/70 hover:text-background transition-colors">
                  Donate Now
                </a>
              </li>
              <li>
                <a href="#impact-section" className="text-background/70 hover:text-background transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#mission" className="text-background/70 hover:text-background transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#footer" className="text-background/70 hover:text-background transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-background/70">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>contact@nobelhands.org</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/70">
          <p>&copy; 2026 Nobel Hands. All rights reserved. Made with ❤️ for a hunger-free world.</p>
        </div>
      </div>
    </footer>
  );
}
