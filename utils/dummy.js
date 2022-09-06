export const dummyRecipes = [
  {
    title: "Fettuccine Carbonara",
    prepTime: 20, cookTime: 60,
    favourited: true,
    imageSrc: [
      "https://images.unsplash.com/photo-1660924770022-a0b64016fc24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGx1bmNofGVufDB8MXwyfHw%3D&auto=format&fit=crop&w=500&q=60",
    ]
  },
  {
    title: "Healthy Side Dishes",
    prepTime: 20, cookTime: 25,
    favourited: false,
    imageSrc: [
      "https://images.unsplash.com/photo-1660669120038-66a7d2b1f118?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    ]
  },
  {
    title: "Yummy Rice Dish!",
    prepTime: 40, cookTime: 60,
    favourited: false,
    imageSrc: [
      "https://images.unsplash.com/photo-1661831236743-76d640ceadfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    ]
  },
  {
    title: "Prawn & Rice :o",
    prepTime: 30, cookTime: 90,
    favourited: false,
    imageSrc: [
      "https://images.unsplash.com/photo-1661830948831-04dbc5074a8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb2R8ZW58MHwxfDJ8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    ]
  },
  {
    title: "Chicken Rice",
    prepTime: 40, cookTime: 120,
    favourited: false,
    imageSrc: [
      "https://images.unsplash.com/photo-1661831870991-570c7172edfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    ]
  },
  {
    title: "Migoreng",
    prepTime: 25, cookTime: 60,
    favourited: true,
    imageSrc: [
      "https://images.unsplash.com/photo-1661830948853-245ad0b18173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    ]
  },
  {
    title: "Tomato and Bread",
    prepTime: 5, cookTime: 15,
    favourited: true,
    imageSrc: [
      "https://images.unsplash.com/photo-1660561830448-9c4e8d0e3df9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGx1bmNofGVufDB8MXwyfHw%3D&auto=format&fit=crop&w=500&q=60",
    ]
  },
  {
    title: "Broken Rice",
    prepTime: 5, cookTime: 5,
    favourited: false,
    imageSrc: [
      "https://images.unsplash.com/photo-1660927428739-46f19e9a4e63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    ]
  },
];

export const dummyFilters = [
  {
    id: "dietry-requirements",
    name: "Dietry Requirements",
    options: [
      { value: "dairy-free", label: "Dairy Free" },
      { value: "gluten-free", label: "Gluten Free" },
      { value: "nut-free", label: "Nut Free" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "halal", label: "Halal" },
      { value: "pregnancy", label: "Pregnancy" },
    ],
  },
  {
    id: "meal-type",
    name: "Meal",
    options: [
      { value: "breakfast", label: "Breakfast" },
      { value: "lunch", label: "Lunch" },
      { value: "dinner", label: "Dinner" },
      { value: "dessert", label: "Dessert" },
    ],
  },
  {
    id: "other",
    name: "Other",
    options: [{ value: "favourited", label: "Favourited" }],
  },
];