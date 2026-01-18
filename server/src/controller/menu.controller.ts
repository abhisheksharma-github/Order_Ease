import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import { Types } from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid price",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file);

    const menu = await Menu.create({
      name,
      description,
      price: priceNum,
      image: imageUrl,
    });

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      await Menu.findByIdAndDelete(menu._id);
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    restaurant.menus.push(menu._id as any);
    await restaurant.save();

    return res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;

    if (!req.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    const restaurant = await Restaurant.findOne({ user: req.id });
    const hasMenu = restaurant?.menus.some(
      (menuId) => menuId.toString() === (menu._id as any).toString()
    );

    if (!restaurant || !hasMenu) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    if (name) menu.name = name;
    if (description) menu.description = description;

    if (price) {
      const priceNum = Number(price);
      if (isNaN(priceNum) || priceNum < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid price",
        });
      }
      menu.price = priceNum;
    }

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(file);
      menu.image = imageUrl;
    }

    await menu.save();

    return res.status(200).json({
      success: true,
      message: "Menu updated",
      menu,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
