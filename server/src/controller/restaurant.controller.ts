import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/order.model";

export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;

        // Input validation
        if (!restaurantName || !city || !country || !deliveryTime || !cuisines) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: restaurantName, city, country, deliveryTime, cuisines"
            });
        }

        if (!req.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            });
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        let parsedCuisines;
        try {
            parsedCuisines = typeof cuisines === 'string' ? JSON.parse(cuisines) : cuisines;
            if (!Array.isArray(parsedCuisines) || parsedCuisines.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "At least one cuisine is required"
                });
            }
        } catch (parseError) {
            return res.status(400).json({
                success: false,
                message: "Invalid cuisines format"
            });
        }

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        const newRestaurant = await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime: Number(deliveryTime),
            cuisines: parsedCuisines,
            imageUrl
        });

        return res.status(201).json({
            success: true,
            message: "Restaurant Added",
            restaurant: newRestaurant
        });
    } catch (error: any) {
        console.error("Create restaurant error:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors).map((err: any) => err.message).join(", ")
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const getRestaurant = async (req: Request, res: Response) => {
    try {
        if (!req.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const restaurant = await Restaurant.findOne({ user: req.id }).populate('menus');
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                restaurant: null,
                message: "Restaurant not found"
            });
        }

        return res.status(200).json({
            success: true,
            restaurant
        });
    } catch (error: any) {
        console.error("Get restaurant error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;

        if (!req.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        if (restaurantName) restaurant.restaurantName = restaurantName;
        if (city) restaurant.city = city;
        if (country) restaurant.country = country;
        if (deliveryTime) restaurant.deliveryTime = Number(deliveryTime);

        if (cuisines) {
            try {
                const parsedCuisines = typeof cuisines === 'string' ? JSON.parse(cuisines) : cuisines;
                if (Array.isArray(parsedCuisines) && parsedCuisines.length > 0) {
                    restaurant.cuisines = parsedCuisines;
                }
            } catch (parseError) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid cuisines format"
                });
            }
        }

        if (file) {
            try {
                const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
                restaurant.imageUrl = imageUrl;
            } catch (uploadError) {
                console.error("Image upload error:", uploadError);
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload image"
                });
            }
        }

        await restaurant.save();

        return res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        });
    } catch (error: any) {
        console.error("Update restaurant error:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors).map((err: any) => err.message).join(", ")
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const getRestaurantOrder = async (req: Request, res: Response) => {
    try {
        if (!req.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        const orders = await Order.find({ restaurant: restaurant._id })
            .populate('restaurant')
            .populate('user')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error: any) {
        console.error("Get restaurant orders error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!req.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const validStatuses = ["pending", "confirmed", "preparing", "outfordelivery", "delivered"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status must be one of: ${validStatuses.join(", ")}`
            });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Verify the order belongs to the restaurant owned by this user
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant || order.restaurant.toString() !== (restaurant._id as string).toString()) {
            return res.status(403).json({
                success: false,
                message: "You don't have permission to update this order"
            });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({
            success: true,
            status: order.status,
            message: "Status updated"
        });
    } catch (error: any) {
        console.error("Update order status error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine.trim());
        const query: any = {};

        // Combine searchText and searchQuery
        const searchTerm = searchText || searchQuery;
        
        if (searchTerm) {
            query.$or = [
                { restaurantName: { $regex: searchTerm, $options: 'i' } },
                { city: { $regex: searchTerm, $options: 'i' } },
                { country: { $regex: searchTerm, $options: 'i' } },
                { cuisines: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines };
        }

        const restaurants = await Restaurant.find(query).limit(50).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: restaurants,
            count: restaurants.length
        });
    } catch (error: any) {
        console.error("Search restaurant error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const getSingleRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurantId = req.params.id;

        if (!restaurantId) {
            return res.status(400).json({
                success: false,
                message: "Restaurant ID is required"
            });
        }

        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { sort: { createdAt: -1 } }
        });

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        return res.status(200).json({
            success: true,
            restaurant
        });
    } catch (error: any) {
        console.error("Get single restaurant error:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
export const getAllRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.find({}).limit(20).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: restaurants
        });
    } catch (error: any) {
        console.error("Get all restaurants error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
