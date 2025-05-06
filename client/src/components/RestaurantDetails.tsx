import AvailableMenu from "./AvailableMenu";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";

const RestaurantDetails = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      {/* Restaurant Image */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-md h-32 sm:h-48 md:h-64 lg:h-80">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/924/189/172/cuisine-food-india-indian-wallpaper-preview.jpg"
            alt="Food_Menu"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="flex flex-col md:flex-row justify-between mt-5 md:mt-10">
        {/* Left Side: Restaurant Name, Cuisines, and Delivery Time */}
        <div className="my-5 md:my-0 md:mr-5">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            Hindon Veg
          </h1>
          <div className="flex flex-wrap gap-2 my-2">
            {[
              "Paneer Butter Masala",
              "Paneer Matar",
              "Paneer Tikka",
              "Biryani",
              "Chicken Masala",
              "Butter Chicken",
            ].map((cuisine: string, idx: number) => (
              <Badge key={idx} className="text-sm font-semibold">
                {cuisine}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-2 my-5">
            <div className="flex items-center gap-2">
              <Timer />
              <h1 className="text-sm font-semibold">
                Delivery Time:{" "}
                <span className="text-[#D19254]">Please Wait....</span>
              </h1>
            </div>
          </div>

          {/* Available Menu Component */}
          <AvailableMenu isLoading={true} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
