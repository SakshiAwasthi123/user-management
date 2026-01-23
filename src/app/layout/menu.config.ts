export interface MenuChild {
  title: string;
  route: string;
  roles?: string[];
}

export interface MenuItem {
  title: string;
  route?: string;
  children?: MenuChild[];
  roles?: string[];
}

export const MENU: MenuItem[] = [

  { title: 'Dashboard', route: '/dashboard' },

  {
    title: 'Users',
    roles: ['Admin', 'User'],
    children: [
      { title: 'User List', route: '/users/list', roles: ['Admin', 'User'] },
      { title: 'Add User', route: '/users/add', roles: ['Admin'] }
    ]
  },

  {
    title: 'Products',
    children: [
      { title: 'List', route: '/products/list', roles: ['Admin', 'User'] },
      { title: 'Categories', route: '/products/categories', roles: ['Admin'] }
    ]
  },

  {
    title: 'Reports',
    children: [
      { title: 'Monthly', route: '/reports/monthly', roles: ['Admin', 'Manager'] },
      { title: 'Yearly', route: '/reports/yearly', roles: ['Admin', 'Manager'] }
    ]
  },

  {
    title: 'Profile',
    children: [
      { title: 'Profile Manage', route: '/profile' },
      { title: 'Profile View', route: '/profile/preview' }
    ]
  }
];
