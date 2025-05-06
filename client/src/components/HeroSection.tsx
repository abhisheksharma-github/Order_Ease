import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

// Animation helper classes
const fadeInUp = "animate-fade-in-up";
const scaleIn = "animate-scale-in";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div
        className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://t3.ftcdn.net/jpg/02/97/67/70/360_F_297677001_zX7ZzRq8DObUV5IWTHAIhAae6DuiEQh4.jpg")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 via-orange-400/60 to-transparent dark:from-gray-900/90 dark:via-gray-800/70 dark:to-transparent rounded-b-3xl"></div>
        <div
          className={`relative z-10 flex flex-col items-center max-w-2xl text-center gap-6 ${fadeInUp}`}
        >
          <h1 className="font-extrabold text-4xl md:text-6xl text-white drop-shadow-lg animate-fade-in-up delay-100">
            Satisfy Your Cravings, Order Food Now!
          </h1>
          <p className="text-white/90 text-lg md:text-xl animate-fade-in-up delay-200">
            From local flavors to global cuisines, we bring it to you. Dine
            without the line, order from the comfort of home.
          </p>
          <div className="w-full max-w-xl mt-4 flex gap-2 animate-fade-in-up delay-300">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search restaurant, city, food, recipe"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-12 py-4 shadow-xl rounded-full border-2 border-orange-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <Search className="text-orange-400 dark:text-orange-300 absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6" />
            </div>
            <Button
              onClick={() => navigate(`/search/${searchText}`)}
              className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-transform duration-300"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Explore Food */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2
          className={`text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400 ${fadeInUp}`}
        >
          Explore Food
        </h2>
        <p
          className={`text-gray-500 dark:text-gray-400 mb-8 text-center ${fadeInUp} delay-100`}
        >
          Discover new cuisines and dishes from around the world.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              name: "Spaghetti",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrWvJMvrO9EMijsqywntFQZiDRbFTpuxM1Ng&s",
            },
            {
              name: "Sushi",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ48iaAy81c6BCNL1QOMYUaAzh5O6i5yVlkVw&s",
            },
            {
              name: "Tacos",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6mNC2bnUO1ztdeNctFKawdy667jVSWBqLtQ&s",
            },
            {
              name: "Momo's",
              img: "https://images.eatsmarter.com/sites/default/files/styles/1600x1200/public/shrimp-dim-sum-590648.jpg",
            },
            {
              name: "Neapolitan Pizza",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELpw_wyR5D4wK9dnb9pz5z6RJvXZ3nclAHA&s",
            },
            {
              name: "Salad",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOH3qCqlTnieiGTpuqBzY3y_i6oISl5z_wOw&s",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center group ${scaleIn} delay-${
                index * 100
              }`}
            >
              <div className="w-36 h-36 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg border-4 border-orange-200 dark:border-gray-700 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-full"
                />
              </div>
              <h3 className="font-bold text-lg text-orange-600 dark:text-orange-400 mt-4">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Food Recipes */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2
          className={`text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400 ${fadeInUp}`}
        >
          Food Recipes
        </h2>
        <p
          className={`text-gray-500 dark:text-gray-400 mb-8 text-center ${fadeInUp} delay-100`}
        >
          Try out these amazing recipes at home.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Butter Chicken",
              img: "https://media.istockphoto.com/id/618457124/photo/butter-chicken-served-with-homemade-indian-naan-bread.jpg?s=612x612&w=0&k=20&c=7FoiHoDtocfPvQIaRFfFani4e5lkfMTNl_619rTTh4g=",
              desc: "A rich and creamy tomato-based curry with tender chicken pieces.",
              link: "https://www.indianhealthyrecipes.com/chicken-butter-masala/",
            },
            {
              name: "Butter Paneer Masala",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSej-dPSZmCQr0FqCDqI1OSwvwUxKQuTHTh_Q&s",
              desc: "A vegetarian delight with paneer cubes in a buttery tomato gravy.",
              link: "https://www.indianhealthyrecipes.com/paneer-butter-masala-restaurant-style/",
            },
            {
              name: "Spaghetti Carbonara",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrWvJMvrO9EMijsqywntFQZiDRbFTpuxM1Ng&s",
              desc: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
              link: "https://www.simplyrecipes.com/recipes/spaghetti_alla_carbonara/",
            },
          ].map((recipe, index) => (
            <div
              key={index}
              className={`p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col ${fadeInUp} delay-${
                index * 100
              }`}
              onClick={() => window.open(recipe.link, "_blank")}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  window.open(recipe.link, "_blank");
              }}
            >
              <img
                src={recipe.img}
                alt={recipe.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="font-bold text-lg text-orange-600 dark:text-orange-400 mb-2">
                {recipe.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-300">{recipe.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comments Section */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2
          className={`text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400 ${fadeInUp}`}
        >
          What People Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              text: "The food was amazing! Delivery was quick and hassle-free.",
              author: "John Doe",
            },
            {
              text: "I love the variety of cuisines available. Highly recommend!",
              author: "Jane Smith",
            },
            {
              text: "Great service and delicious food. Will order again!",
              author: "Alex Johnson",
            },
            {
              text: "The recipes section is a game-changer. I tried Butter Chicken, and it was perfect!",
              author: "Emily Davis",
            },
          ].map((comment, index) => (
            <div
              key={index}
              className={`p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${fadeInUp} delay-${
                index * 100
              }`}
            >
              <p className="text-gray-700 dark:text-gray-200 italic">
                "{comment.text}"
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-4 text-right">
                - {comment.author}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2
          className={`text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400 ${fadeInUp}`}
        >
          Why Choose Us?
        </h2>
        <p
          className={`text-gray-500 dark:text-gray-400 mb-8 text-center ${fadeInUp} delay-100`}
        >
          Discover why thousands of customers trust us for their food cravings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fast Delivery",
              icon: "🚚",
              description:
                "Get your food delivered hot and fresh in no time with our efficient delivery system.",
            },
            {
              title: "Wide Variety",
              icon: "🍽️",
              description:
                "Choose from a wide range of cuisines and dishes to satisfy your cravings.",
            },
            {
              title: "Quality Assurance",
              icon: "✅",
              description:
                "We ensure the highest quality standards for every meal you order.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center ${fadeInUp} delay-${
                index * 100
              }`}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg text-orange-600 dark:text-orange-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Add Comment Section */}
      <section className="max-w-3xl mx-auto py-12 px-4">
        <h2
          className={`text-2xl font-bold mb-4 text-center text-orange-600 dark:text-orange-400 ${fadeInUp}`}
        >
          Send Your Feedback!
        </h2>
        <div
          className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl ${fadeInUp} delay-100`}
        >
          <textarea
            placeholder="Write your Feedback here..."
            className="w-full p-3 border border-orange-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-500 dark:focus:ring-orange-400 resize-none text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900"
            rows={3}
          ></textarea>
          <div className="text-right mt-3">
            <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105">
              Submit
            </Button>
          </div>
        </div>
      </section>

      {/* Animations CSS */}
      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-fade-in { animation: fade-in 0.8s both; }
        .animate-fade-in-up { animation: fade-in-up 0.8s both; }
        .animate-fade-in-left { animation: fade-in-left 0.8s both; }
        .animate-fade-in-right { animation: fade-in-right 0.8s both; }
        .animate-scale-in { animation: scale-in 0.7s both; }
        .delay-0 { animation-delay: 0ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
