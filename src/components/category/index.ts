import { CategoriesList } from "../../pages/CategoriesList/CategoriesList";
import Category from "../../pages/Category/Category";
import { CategoryShow } from "./CategoryShow";
import ClassIcon from '@mui/icons-material/Class';

export default {
  list: CategoriesList,
  show: Category,
  icon: ClassIcon,
  options: { label: "Категории" },
}