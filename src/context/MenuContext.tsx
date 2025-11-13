import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MenuItem } from '../types';

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newMenuItem: MenuItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9), // Generate unique ID
    };
    setMenuItems(prev => [...prev, newMenuItem]);
  };

  const removeMenuItem = (id: string) => {
    console.log('Removing item with ID:', id);
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};