export interface DashboardMenu {
  title: string;
  icon: string;
  route?: string;
  children?: DashboardMenuChild[];
}

export interface DashboardMenuChild {
  title: string;
  icon?: string;
  route: string;
}
