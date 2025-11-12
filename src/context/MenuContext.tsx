import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, Course } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
  clearAllMenuItems: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Load menu items from storage on app start
  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('menuItems');
      if (storedItems) {
        setMenuItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
    }
  };

  const saveMenuItems = async (items: MenuItem[]) => {
    try {
      await AsyncStorage.setItem('menuItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving menu items:', error);
    }
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    
    const updatedItems = [...menuItems, newItem];
    setMenuItems(updatedItems);
    saveMenuItems(updatedItems);
  };

  const removeMenuItem = (id: string) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    setMenuItems(updatedItems);
    saveMenuItems(updatedItems);
  };

  const clearAllMenuItems = () => {
    setMenuItems([]);
    saveMenuItems([]);
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem, clearAllMenuItems }}>
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