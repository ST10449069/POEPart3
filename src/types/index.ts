export type Course = 'Starters' | 'Mains' | 'Desserts';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: Course;
  price: number;
}

export const COURSES: Course[] = ['Starters', 'Mains', 'Desserts'];