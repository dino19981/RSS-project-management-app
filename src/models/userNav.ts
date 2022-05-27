export interface UserNavComponent {
  authorizeStatus: boolean;
}

export interface NavItem {
  title: string;
  path: string;
  isAuthorize: boolean;
  type: string;
}
