import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

// Animation helper classes
const fadeInUp = "animate-fade-in-up";
const scaleIn = "animate-scale-in";

const foodCategories = [
  {
    name: "Pizza",
    img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Burgers",
    img: "https://images.pexels.com/photos/1639567/pexels-photo-1639567.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Sushi",
    img: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Salads",
    img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Desserts",
    img: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Indian",
    img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400&q=80",
  },
];

const featuredRestaurants = [
  {
    name: "Pizza Palace",
    img: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&w=400&q=80",
    desc: "Best wood-fired pizzas in town.",
  },
  {
    name: "Burger Hub",
    img: "https://images.pexels.com/photos/1639567/pexels-photo-1639567.jpeg?auto=compress&w=400&q=80",
    desc: "Juicy burgers & crispy fries.",
  },
  {
    name: "Sushi World",
    img: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&w=400&q=80",
    desc: "Fresh sushi & sashimi platters.",
  },
];

const testimonials = [
  // spell-checker: disable
  {
    text: "Lightning fast delivery and delicious food. My go-to app for ordering dinner!",
    author: "Priya S.",
  },
  {
    text: "Love the variety and the easy-to-use interface. Highly recommended!",
    author: "Rahul K.",
  },
  {
    text: "The loyalty rewards keep me coming back. Great service!",
    author: "Sneha M.",
  },
  {
    text: "Tried the new Sushi World restaurant, and it was amazing!",
    author: "Amit T.",
  },
  // spell-checker: enable
];

const features = [
  {
    title: "Lightning Fast Delivery",
    icon: "⚡",
    description: "Get your food delivered hot & fresh in under 30 minutes.",
  },
  {
    title: "Exclusive Offers",
    icon: "🎁",
    description: "Enjoy daily deals, discounts, and loyalty rewards.",
  },
  {
    title: "Curated Restaurants",
    icon: "🏆",
    description: "Order from top-rated restaurants and cloud kitchens.",
  },
];

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim()) navigate(`/search/${searchText}`);
  };

  const handleFeedback = () => {
    if (feedback.trim()) {
      setFeedbackSent(true);
      setFeedback("");
      setTimeout(() => setFeedbackSent(false), 2500);
    }
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 min-h-screen text-gray-900 dark:text-gray-100 w-full">
      {/* HERO */}
      <div
        className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 115, 0, 0.65),rgba(255,255,255,0.1)),url("https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&w=1200&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 via-orange-400/60 to-transparent dark:from-gray-900/90 dark:via-gray-800/70 dark:to-transparent rounded-b-3xl"></div>
        <div
          className={`relative z-10 flex flex-col items-center max-w-2xl text-center gap-6 ${fadeInUp}`}
        >
          <h1 className="font-extrabold text-5xl md:text-7xl text-white drop-shadow-lg animate-fade-in-up delay-100">
            Order Food, <span className="text-orange-300">Fast & Fresh</span>
          </h1>
          <p className="text-white/90 text-lg md:text-2xl animate-fade-in-up delay-200">
            Discover top restaurants, exclusive offers, and your favorite dishes
            delivered to your door.
          </p>
          <div className="w-full max-w-xl mt-4 flex gap-2 animate-fade-in-up delay-300">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search for food, restaurant, or cuisine"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-12 py-4 shadow-xl rounded-full border-2 border-orange-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
              />
              <Search className="text-orange-400 dark:text-orange-300 absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6" />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transition-transform duration-300"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2
          className={`text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400 ${fadeInUp}`}
        >
          Explore Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {foodCategories.map((item, index) => (
            <div
              key={item.name}
              className={`flex flex-col items-center group ${scaleIn} delay-${index * 100}`}
            >
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg border-4 border-orange-200 dark:border-gray-700 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
              <h3 className="font-bold text-lg text-orange-600 dark:text-orange-400 mt-3">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED RESTAURANTS */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2
          className={`text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400 ${fadeInUp}`}
        >
          Featured Restaurants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRestaurants.map((rest, index) => (
            <div
              key={rest.name}
              className={`p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center ${fadeInUp} delay-${index * 100}`}
            >
              <img
                src={rest.img}
                alt={rest.name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-orange-200 dark:border-gray-700"
              />
              <h3 className="font-bold text-xl text-orange-600 dark:text-orange-400 mb-2">
                {rest.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-300 text-center">
                {rest.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2
          className={`text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400 ${fadeInUp}`}
        >
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center ${fadeInUp} delay-${index * 100}`}
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

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2
          className={`text-3xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400 ${fadeInUp}`}
        >
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((comment, index) => (
            <div
              key={index}
              className={`p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${fadeInUp} delay-${index * 100}`}
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

      {/* FEEDBACK */}
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
            placeholder="Write your feedback here..."
            className="w-full p-3 border border-orange-300 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-orange-500 dark:focus:ring-orange-400 resize-none text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <div className="text-right mt-3">
            <Button
              className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
              onClick={handleFeedback}
              disabled={feedbackSent || !feedback.trim()}
            >
              {feedbackSent ? "Thank you!" : "Submit"}
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
        @keyframes scale-in {
        from { opacity: 0; transform: scale(0.8);}
        to { opacity: 1; transform: scale(1);}
        }
        .animate-fade-in { animation: fade-in 0.8s both; }
        .animate-fade-in-up { animation: fade-in-up 0.8s both; }
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
