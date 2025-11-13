export type Course = 'Starters' | 'Mains' | 'Desserts' | 'Appetizer' | 'Hors D-Oeuvres' | 'Amuse-Bouche' | 'Soup' | 'Salad' | 'Sorbet' | 'Prosecco';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: Course;
  price: number;
}

export const COURSES: Course[] = ['Starters', 'Mains', 'Desserts', 'Appetizer', 'Hors D-Oeuvres', 'Amuse-Bouche', 'Soup', 'Salad', 'Sorbet', 'Prosecco'];