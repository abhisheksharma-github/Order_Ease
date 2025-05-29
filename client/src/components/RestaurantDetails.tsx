import { useRestaurantStore } from "@/store/useRestaurantStore";
import AvailableMenu from "./AvailableMenu";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetail = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

  useEffect(() => {
    getSingleRestaurant(params.id!);
  }, [params.id]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="w-full">
        <div className="relative w-full h-40 md:h-72 lg:h-80">
          <img
            src={singleRestaurant?.imageUrl || "Loading..."}
            alt="res_image"
            className="object-cover w-full h-full rounded-xl shadow-xl"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-7">
            <h1 className="font-bold text-2xl md:text-4xl text-orange-300 tracking-tight mb-2 text-center">
              {singleRestaurant?.restaurantName || "Loading..."}
            </h1>
            <div className="flex flex-wrap gap-2 my-3">
              {singleRestaurant?.cuisines.map(
                (cuisine: string, idx: number) => (
                  <Badge
                    key={idx}
                    className="text-sm px-3 py-1 rounded-full bg-[#f3e8ff] text-[#cb8036]  font-semibold"
                  >
                    {cuisine}
                  </Badge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-6">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-[#D19254]" />
                <span className="font-medium text-lg text-black">
                  Delivery Time:{" "}
                  <span className="text-[#cb8036] font-semibold">
                    {singleRestaurant?.deliveryTime || "NA"} mins
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {singleRestaurant?.menus && (
          <AvailableMenu menus={singleRestaurant?.menus!} />
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
