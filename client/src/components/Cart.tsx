import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import CheckoutConfirmPage from "./CheckoutConfirmPage";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  tableNo: number;
  image?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Butter Chicken Curry",
      price: 280,
      quantity: 1,
      tableNo: 1,
      image: "",
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);

  const handleIncrement = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="mx-auto my-12 px-4 sm:px-6 lg:px-8 max-w-full">
      <div className="flex justify-end mb-4">
        <Button variant="link" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>
      <div className="overflow-x-auto w-full">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Item</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Table No</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">
                  <Avatar>
                    <AvatarImage src={item.image || ""} />
                    <AvatarFallback>{item.title[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="text-center">{item.title}</TableCell>
                <TableCell className="text-center">{item.price}</TableCell>
                <TableCell className="text-center">
                  <div className="w-fit flex items-center justify-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full bg-gray-100 bg-orange-0 hover:bg-orange-400"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <Minus />
                    </Button>
                    <Button
                      size={"icon"}
                      className="font-extrabold"
                      disabled
                      variant={"outline"}
                    >
                      {item.quantity}
                    </Button>
                    <Button
                      size={"icon"}
                      className="rounded-full bg-orange-0 hover:bg-orange-400"
                      variant={"outline"}
                      onClick={() => handleIncrement(item.id)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.tableNo}</TableCell>
                <TableCell className="text-center">
                  {item.price * item.quantity}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size={"sm"}
                    className="rounded-full text-gray-700 bg-orange-300 hover:bg-orange-500"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-2xl font-bold">
              <TableCell colSpan={6} className="text-right">
                Total:
              </TableCell>
              <TableCell className="text-right">{calculateTotal()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full text-gray-700 bg-orange-300 hover:bg-orange-500"
          disabled={cartItems.length === 0}
        >
          Proceed To Checkout
        </Button>
      </div>

      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
