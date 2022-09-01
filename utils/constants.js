import {
  HomeIcon,
  HeartIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export const navigationOptions = [
  { id: 1, name: "Home", href: "/recipes", icon: HomeIcon },
  { id: 2, name: "Favourites", href: "/recipes/favourites", icon: HeartIcon },
  { id: 3, name: "Add Recipe", href: "/recipes/add", icon: PlusCircleIcon },
];
