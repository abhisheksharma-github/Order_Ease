import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/Card";

interface AvailableMenuProps {
  addToCart: (item: any, tableNo: number) => void;
}

const AvailableMenu = ({ addToCart }: AvailableMenuProps) => {
  const menuItems = [
    {
      id: 1,
      title: "Butter Chicken Curry",
      description: "Punjab Special Butter Chicken",
      price: 280,
      image:
        "https://media.istockphoto.com/id/618457124/photo/butter-chicken-served-with-homemade-indian-naan-bread.jpg?s=612x612&w=0&k=20&c=7FoiHoDtocfPvQIaRFfFani4e5lkfMTNl_619rTTh4g=",
    },
    {
      id: 2,
      title: "Paneer Butter Masala",
      description: "Creamy and Delicious Paneer",
      price: 250,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSej-dPSZmCQr0FqCDqI1OSwvwUxKQuTHTh_Q&s",
    },
    {
      id: 3,
      title: "Hyderabadi Chicken Biryani",
      description: "Tasty and Spicy Special Biryani",
      price: 320,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhFrAiF93PDmOuLRFDaqC1T-KIzSyLB_tRSw&s",
    },
    {
      id: 4,
      title: "Delicious Tasty Rasmalai",
      description: "Creamy and delicious SweetDish",
      price: 180,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Xb1fpepAQlfGJG-m8OWhhwh2_FZBjad5Fw&s",
    },
  ];

  const [selectedTables, setSelectedTables] = useState<{
    [key: number]: number;
  }>({});

  return (
    <div className="p-2 md:p-5 lg:p-6 mt-3 md:mt-6 lg:mt-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <Card
              key={item.id}
              className="shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <h3 className="text-lg font-semibold mt-3">
                  Price: <span className="text-[#d19254]">₹{item.price}</span>
                </h3>

                <div className="mt-3">
                  <label className="text-sm font-semibold">Select Table:</label>
                  <select
                    className="ml-2 p-1 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    value={selectedTables[item.id] || ""}
                    onChange={(e) =>
                      setSelectedTables((prev) => ({
                        ...prev,
                        [item.id]: Number(e.target.value),
                      }))
                    }
                  >
                    <option value="">Choose</option>
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        Table {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-orange-400 hover:bg-orange-500 w-full"
                  onClick={() => addToCart(item, selectedTables[item.id] || 1)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableMenu;
