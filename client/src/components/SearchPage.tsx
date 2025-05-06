import { Link } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { AspectRatio } from "./ui/aspect-ratio";

const restaurantData = [
  {
    name: "Hindon Veg",
    city: "Delhi",
    country: "India",
    cuisines: ["Veg Thali", "Paneer", "Dal Makhani"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2i8H4SZ_2akoaMAZEmBP_4dKMA3TZpIVUFA&s",
  },
  {
    name: "Pizza",
    city: "Roma",
    country: "Italy",
    cuisines: ["Pizza", "Pasta", "Garlic Bread"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFb-QOETAw_2smnhPtCqsh8A1KTeBnpYEBTQ&s",
  },
  {
    name: "KhaloOnly",
    city: "New York City",
    country: "USA",
    cuisines: ["Samosa", "Chicken Tikka", "Naan"],
    image:
      "https://masalaandchai.com/wp-content/uploads/2022/03/Butter-Chicken.jpg",
  },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* Search Input Field */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by restaurant & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="bg-orange-400 hover:bg-orange-500">
              Search
            </Button>
          </div>

          {/* Searched Items Display */}
          <div>
            <div className="flex flex-col gap-3 md:flex md:items-center md:gap-2 my-2">
              <h1 className="font-medium text-lg">(3) Search Result Found</h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {["Veg", "Pizza", "Biryani"].map((selectedFilter, idx) => (
                  <div
                    key={idx}
                    className="relative inline-flex items-center max-w-full"
                  >
                    <Badge
                      className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                      variant="outline"
                    >
                      {selectedFilter}
                    </Badge>
                    <X
                      size={16}
                      className="absolute text[#D1925] right-1 hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurant Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {restaurantData.map((restaurant, idx) => (
                <Card key={idx}>
                  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-600 opacity-70 rounded-lg py-1 px-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Featured
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {restaurant.name}
                    </h1>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:gray-400">
                      <MapPin size={16} />
                      <p className="text-sm">
                        City:{" "}
                        <span className="font-medium">{restaurant.city}</span>
                      </p>
                    </div>
                    <div className="mt-2 gap-1 flex items-center text-gray-600 dark:gray-400">
                      <Globe size={16} />
                      <p className="text-sm">
                        Country:{" "}
                        <span className="font-medium">
                          {restaurant.country}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-4 mt-4 flex-wrap cursor-pointer">
                      {restaurant.cuisines.map((cuisine, idx) => (
                        <Badge
                          className="font-medium px-2 py-1 rounded-full shadow-md"
                          key={idx}
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 border-t-0 dark:border-t-gray-700 border-t-gray-100 text-white flex justify-center">
                    <Link to={`/restaurant/${idx}`} className="text-white">
                      <Button className="bg-orange-400 hover:bg-orange-500 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-100">
                        View Menu
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
