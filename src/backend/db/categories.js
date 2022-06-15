import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Yoga/Exercise",
  },
  {
    _id: uuid(),
    categoryName: "Meditation",
  },
  {
    _id: uuid(),
    categoryName: "Devotional",
  },
  {
    _id: uuid(),
    categoryName: "Motivational",
  },
  {
    _id: uuid(),
    categoryName: "Morning-mix"
  }
]
