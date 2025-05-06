// 7:00:33 min se start karna ha firse
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";

const AddMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [editOpen, setEditopen] = useState<boolean>(false);
  const [error, setError] = useState<Partial<MenuFormSchema>>();
  const loading = false;

  const menuItems = [
    {
      id: 1,
      name: "Butter Paneer Masala",
      description:
        "Creamy, spiced cottage cheese curry with rich tomato gravy.",
      price: 280,
      image:
        "https://madscookhouse.com/wp-content/uploads/2020/10/Paneer-Butter-Masala-Nut-Free-500x375.jpg",
    },
    {
      id: 2,
      name: "Butter Chicken ",
      description:
        "Tender chicken in buttery, creamy, and flavorful tomato sauce.",
      price: 380,
      image:
        "https://masalaandchai.com/wp-content/uploads/2022/03/Butter-Chicken.jpg",
    },
  ];
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput((prevInput: any) => ({
      ...prevInput,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    // api ka kaam start from here
  };

  return (
    <div className="max-w-6xl mx-auto my-12">
      <div className="flex justify-between items-center">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl ">
          Available Menu
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange-400 hover:bg-orange-500 flex items-center ">
              <Plus className="mr-2" />
              Add Menu Here
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new menu</DialogTitle>
              <DialogDescription>Create your own menu here</DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  placeholder="Enter Menu Name"
                  onChange={changeEventHandler}
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.name}
                  </span>
                )}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter menu description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.description}
                  </span>
                )}
              </div>
              <div>
                <Label>Price in (Rupees)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  placeholder="Enter Menu price"
                  onChange={changeEventHandler}
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.price}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput((prevInput: any) => ({
                      ...prevInput,
                      image: e.target.files ? e.target.files[0] : undefined,
                    }))
                  }
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.image?.name || "Image is Required"}
                  </span>
                )}
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button
                    disabled
                    className="bg-orange-400 hover:bg-orange-500"
                  >
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please Wait
                  </Button>
                ) : (
                  <Button className="bg-orange-400 hover:bg-orange-500">
                    Submit Here
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 space-y-4">
        {menuItems.map((menu) => (
          <div
            key={menu.id}
            className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 shadow-md rounded-lg border"
          >
            <img
              src={menu.image}
              alt={menu.name}
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-orange-400"> {menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menuItems);
                setEditopen(true);
              }}
              size={"sm"}
              className="bg-orange-400 hover:bg-orange-500 "
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
      <EditMenu
        editOpen={editOpen}
        selectedMenu={selectedMenu}
        setEditopen={setEditopen}
      />
    </div>
  );
};

export default AddMenu;
