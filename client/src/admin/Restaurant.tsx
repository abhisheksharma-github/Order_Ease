import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RestaurantFormSchema,
  restaurantFromSchema,
} from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });
  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});
  const {
    loading,
    restaurant,
    updateRestaurant,
    createRestaurant,
    getRestaurant,
  } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }

      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if (restaurant) {
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          imageFile: undefined,
        });
      }
    };
    fetchRestaurant();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white rounded-lg shadow-lg p-8">
      <div>
        <div>
          <h1 className="font-extrabold text-3xl md:text-4xl mb-8 text-orange-500 tracking-tight text-center">
            {restaurant ? "Update Restaurant" : "Add Restaurant"}
          </h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-8 space-y-4 md:space-y-0">
              {/* Restaurant Name  */}
              <div>
                <Label className="block text-lg font-semibold text-gray-700 mb-2">
                  Restaurant Name
                </Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  placeholder="Enter your restaurant name"
                  className="text-base px-4 py-2 rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium mt-1 block">
                    {errors.restaurantName}
                  </span>
                )}
              </div>
              <div>
                <Label className="block text-lg font-semibold text-gray-700 mb-2">
                  City
                </Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city name"
                  className="text-base px-4 py-2 rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium mt-1 block">
                    {errors.city}
                  </span>
                )}
              </div>
              <div>
                <Label className="block text-lg font-semibold text-gray-700 mb-2">
                  Country
                </Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country name"
                  className="text-base px-4 py-2 rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium mt-1 block">
                    {errors.country}
                  </span>
                )}
              </div>
              <div>
                <Label className="block text-lg font-semibold text-gray-700 mb-2">
                  Delivery Time
                </Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder="Enter your delivery time"
                  className="text-base px-4 py-2 rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium mt-1 block">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label className="block text-lg font-semibold text-gray-700 mb-2">
                  Cuisines
                </Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setInput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder="e.g. Momos, Biryani"
                  className="text-base px-4 py-2 rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium mt-1 block">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label className="block text-lg font-semibold text-gray-700 mb-2">
                  Upload Restaurant Banner
                </Label>
                <Input
                  onChange={(e) =>
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                  accept="image/*"
                  name="imageFile"
                  className="text-base px-4 py-2 rounded-md border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium mt-1 block">
                    {errors.imageFile?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="my-8 w-fit mx-auto">
              {loading ? (
                <Button
                  disabled
                  className="bg-orange-400 hover:bg-orange-500 text-lg font-bold px-8 py-3 rounded-md"
                >
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="bg-orange-500 hover:bg-orange-600 text-lg font-bold px-8 py-3 rounded-md shadow-md transition-all duration-200">
                  {restaurant
                    ? "Update Your Restaurant"
                    : "Add Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
