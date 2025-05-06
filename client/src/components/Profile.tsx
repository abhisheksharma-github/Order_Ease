import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>();
  const filechangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateProfile(profileData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <form className="max-w-7xl mx-auto my-5" onSubmit={updateProfileHandler}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={selectedProfilePicture} />
            <AvatarFallback>Profile Pic</AvatarFallback>
            <input
              type="file"
              className="hidden"
              ref={imageRef}
              accept="image/*"
              onChange={filechangeHandler}
              value={profileData.fullname}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h" />
            </div>
          </Avatar>
          <Input
            type="text"
            name={profileData.fullname}
            onChange={(e) =>
              setProfileData({ ...profileData, fullname: e.target.value })
            }
            className="font-bold text-2xl outline-none border-none focus-visible: ring-transparent bg-transparent text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-700">
          <Mail className="text-gray-800 dark:text-gray-200" />
          <div className="w-full">
            <Label className="text-gray-900 dark:text-gray-100">Email</Label>
            <input
              disabled
              name="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              className="w-full text-gray-600 dark:text-gray-300 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-700">
          <LocateIcon className="text-gray-800 dark:text-gray-200" />
          <div className="w-full">
            <Label className="text-gray-900 dark:text-gray-100">Address</Label>
            <input
              name="address"
              value={profileData.address}
              onChange={(e) =>
                setProfileData({ ...profileData, address: e.target.value })
              }
              className="w-full text-gray-600 dark:text-gray-300 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-700">
          <MapPin className="text-gray-800 dark:text-gray-200" />
          <div className="w-full">
            <Label className="text-gray-900 dark:text-gray-100">City</Label>
            <input
              name="city"
              value={profileData.city}
              onChange={(e) =>
                setProfileData({ ...profileData, city: e.target.value })
              }
              className="w-full text-gray-600 dark:text-gray-300 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-700">
          <MapPinnedIcon className="text-gray-800 dark:text-gray-200" />
          <div className="w-full">
            <Label className="text-gray-900 dark:text-gray-100">Country</Label>
            <input
              name="country"
              value={profileData.country}
              onChange={(e) =>
                setProfileData({ ...profileData, country: e.target.value })
              }
              className="w-full text-gray-600 dark:text-gray-300 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="text-center">
          {isLoading ? (
            <Button
              disabled
              className=" bg-orange-500 hover:bg-orange-400 hover:border-red-500 "
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-gray-900 dark:text-gray-100"
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Profile;

async function updateProfile(profileData: {
  fullname: string;
  email: string;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
}) {
  const response = await fetch("/api/updateProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return await response.json();
}
