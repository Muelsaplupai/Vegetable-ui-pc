import { Item } from "vue3-easy-data-table";

export const mockClientItems = (itemsNumber = 100): Item[] => {
  const mockItems: Item[] = [];
  const fruits = ["banana", "apple", "orange", "peach"];

  for (let i = 1; i < itemsNumber + 1; i += 1) {
    mockItems.push({
      name: "番茄",
      province: "江苏",
      height:"常州",
      weight: 133,
      age: 155,
      favouriteSport: 122,
      favouriteFruits: fruits[i % 4]
    });
  }
  return mockItems;
};
