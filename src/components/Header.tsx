
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
}

const Header = ({ title, subtitle, compact = false, className }: HeaderProps) => {
  return (
    <header className={cn(
      "text-left",
      compact ? "pb-2" : "pb-4",
      className
    )}>
      <h1 className={cn(
        "font-bold text-montreal-darkGray",
        compact ? "text-lg" : "text-2xl"
      )}>
        {title}
      </h1>
      {subtitle && (
        <p className={cn(
          "text-gray-500",
          compact ? "text-xs" : "text-sm"
        )}>
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default Header;
