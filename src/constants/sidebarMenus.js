import {
  LayoutDashboard,
  Settings,
  Users,
  Book,
  MapPin,
} from "lucide-react";

export const SIDEBAR_MENUS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title:"Appointment",
    icon: Book,
    path: "/appointment",
  },
  {
    title:"Address",
    icon: MapPin,
    path: "/address",
  }
];
