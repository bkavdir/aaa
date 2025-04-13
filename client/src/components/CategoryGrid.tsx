import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const CategoryGrid = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden h-64">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories?.map((category, index) => (
        <CategoryCard
          key={category.id}
          category={category}
          index={index}
        />
      ))}
    </div>
  );
};

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  // Rotate colors based on index
  const colors = ["[hsl(184,100%,50%)]", "[hsl(320,100%,50%)]", "[hsl(60,100%,50%)]"];
  const colorIndex = index % colors.length;
  const textColor = `text-${colors[colorIndex]}`;
  const borderColor = `border-${colors[colorIndex]}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-lg group h-64"
    >
      <img 
        src={category.image} 
        alt={category.name} 
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full p-6">
        <h3 className="text-2xl font-bold uppercase mb-2">{category.name}</h3>
        <span className={`inline-block text-${colors[colorIndex]} border-b ${borderColor} pb-1 group-hover:pr-4 transition-all`}>
          Shop Now
        </span>
      </div>
      <Link href={`/category/${category.slug}`} className="absolute inset-0">
        <span className="sr-only">Shop {category.name}</span>
      </Link>
    </motion.div>
  );
};

export default CategoryGrid;
