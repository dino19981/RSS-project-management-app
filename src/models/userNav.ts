import { AppRoute } from '../const/routes';

export interface UserNavComponent {
  authorizeStatus: boolean;
}

export interface NavItem {
  title: string;
  path: AppRoute;
  isAuthorize: boolean;
  type: string;
}
