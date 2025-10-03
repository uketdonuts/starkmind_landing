// filepath: src/components/NavItem.tsx
import React from 'react';
import { scrollToSection } from '../utils/scroll';

interface NavItemProps {
  sectionId: string;
  children: React.ReactNode;
  variant?: 'link' | 'cta';
  onClose?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ sectionId, children, variant = 'link', onClose }) => {
  const handleClick = (): void => {
    scrollToSection(sectionId);
    if (onClose) onClose();
  };

  const baseClasses =
    variant === 'cta'
      ? 'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-all duration-200 border border-slate-200 w-full lg:w-auto'
      : 'text-slate-300 hover:text-white transition-colors duration-200 relative group px-3 py-3 lg:py-2 rounded-lg font-medium text-sm w-full lg:w-auto text-left lg:text-center hover:bg-slate-800 lg:hover:bg-transparent';

  return (
    <button onClick={handleClick} className={baseClasses}>
      {children}
      {variant === 'link' && (
        <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-[calc(100%-1.5rem)] lg:left-0 lg:group-hover:w-full"></span>
      )}
    </button>
  );
};

export default NavItem;
