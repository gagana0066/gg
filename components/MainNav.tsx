'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/goals', label: 'Goals' },
  { href: '/habits', label: 'Habits' },
  { href: '/journal', label: 'Journal' }
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm transition ${
              isActive
                ? 'bg-[#CBDF90] text-[#0f1e38] font-semibold'
                : 'bg-[rgba(15,30,56,0.45)] text-[#eef4dc] hover:bg-[rgba(143,173,136,0.28)]'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
