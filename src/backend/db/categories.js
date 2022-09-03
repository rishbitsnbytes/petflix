import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Pet Care",
    description:
      "Everything you need to know related to daily pet care for their amazing well being!",
    categoryImg:
      "https://raw.githubusercontent.com/rishbitsnbytes/petflix/development/src/assets/categories/",
  },
  {
    _id: uuid(),
    categoryName: "Pet Training",
    description:
      "Explore various techniques to train your pet for variety of manners!",
    categoryImg:
      "https://raw.githubusercontent.com/rishbitsnbytes/petflix/development/src/assets/categories/",
  },
  {
    _id: uuid(),
    categoryName: "Play with Pets",
    description: "Get your and your pet body moving for everyone's well being!",
    categoryImg:
      "https://raw.githubusercontent.com/rishbitsnbytes/petflix/development/src/assets/categories/",
  },
  {
    _id: uuid(),
    categoryName: "Pet Grooming",
    description: "Groom your pet with all the creativity!",
    categoryImg:
      "https://raw.githubusercontent.com/rishbitsnbytes/petflix/development/src/assets/categories/",
  },
];
