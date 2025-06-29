import { LayoutDashboard, Video, Users, UserMinus, Subtitles } from 'lucide-react';

export const adminNavigation = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    to: '/admin/add-subtitle-video',
    label: 'Add Subtitle Video',
    icon: <Subtitles className="w-5 h-5" />,
  },
  {
    to: '/admin/add-dubbing-video',
    label: 'Add Dubbing Video',
    icon: <Video className="w-5 h-5" />,
  },
  {
    to: '/admin/users',
    label: 'List Users',
    icon: <Users className="w-5 h-5" />,
  },
  {
    to: '/admin/delete-user',
    label: 'Delete User',
    icon: <UserMinus className="w-5 h-5" />,
  },
]; 