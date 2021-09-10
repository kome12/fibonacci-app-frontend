import { Category } from "../../../models/category.model";
import { api } from "../../../utils/api";

export const getCategories = () => api.get<Category[]>(`/gardenCategories`);
