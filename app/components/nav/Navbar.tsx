import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from '@remix-run/react';
import { useState } from 'react';
import cn from 'classnames';
import NavbarLink from './NavbarLink';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 items-center justify-between sm:justify-start bg-stone-900 text-white">
      <div className="container mx-auto flex flex-wrap sm:flex-row py-1.5 px-4">
        <NavLink className="inline-block py-1 mr-4 text-xl text-gray-100" to="/">
          A Very Real Company
        </NavLink>
        <button
          className="inline-block py-1 px-2 leading-none bg-transparent border border-transparent rounded text-stone-100 border-gray-600 ml-auto sm:hidden"
          aria-controls="main-nav"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className={cn(
            'w-full flex-grow items-center sm:flex sm:w-auto',
            {
              collapse: !isOpen,
            },
            'sm:visible',
          )}
          id="main-nav"
        >
          <ul className="flex flex-col pl-0 mb-0 list-none mr-auto sm:flex-row">
            <NavbarLink to="/contacts">Contacts</NavbarLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}
