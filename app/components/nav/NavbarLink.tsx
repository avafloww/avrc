import type { NavLinkProps } from '@remix-run/react';
import { NavLink } from '@remix-run/react';

export default function NavbarLink({ children, ...props }: { children: React.ReactNode } & NavLinkProps) {
  return (
    <li className="py-2 sm:py-0">
      <NavLink className="text-stone-300 hover:text-stone-100 sm:px-2" role="button" {...props}>
        {children}
      </NavLink>
    </li>
  );
}
