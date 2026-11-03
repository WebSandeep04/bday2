import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  onClick,
  variant = 'primary', // primary | secondary | outline | soft
  disabled = false,
  className = '',
  icon: Icon = null,
  size = 'md',
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full cursor-pointer select-none transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2';
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.96, y: 1 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      disabled={disabled}
      className={`btn-aesthetic btn-${variant} btn-size-${size} ${className}`}
      {...props}
    >
      <span className="btn-content">
        {Icon && <Icon className="btn-icon" size={18} />}
        <span>{children}</span>
      </span>
      <span className="btn-shine" />
    </motion.button>
  );
};

