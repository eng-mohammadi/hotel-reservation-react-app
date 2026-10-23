import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRooms } from "../../redux/rooms/actions";
import { setFoods } from "../../redux/foods/actions";
import axios from "axios";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import SliderBox from "../sliderBox/SliderBox";
import RoomCards from "./roomCards/RoomCards";
import FoodCards from "./foodCards/FoodCards";
import Footer from "../footer/Footer";
import SearchRoomsBox from "./searchRoomsBox/SearchRoomsBox";
import SearchFoodsBox from "./searchFoodsBox/SearchFoodsBox";
import Advertisement from "../advertisement/Advertisement";

const Home = () => {
  const [roomImages, setRoomImages] = useState([]);
  const [foodImages, setFoodImages] = useState([]);
  const [roomIndex, setRoomIndex] = useState(0);
  const [foodIndex, setFoodIndex] = useState(0);
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3032/rooms"),
      axios.get("http://localhost:3032/foods"),
    ])
      .then(
        axios.spread((rooms, foods) => {
          setRoomImages(rooms.data.flatMap((room) => room.images));
          dispatch(setRooms(rooms.data));
          setFoodImages(foods.data.flatMap((food) => food.image));
          dispatch(setFoods(foods.data));
        })
      )
      .catch(() => setError("خطای شبکه: داده‌ای دریافت نشد."));
  }, [dispatch]);

  return (
    <React.Fragment>
      <NavbarMenu />
      <SliderBox
        title="اتاق ها"
        error={error}
        images={roomImages}
        index={roomIndex}
        goNext={() =>
          setRoomIndex((nextIndex) => (nextIndex + 1) % roomImages.length)
        }
        goPrev={() =>
          setRoomIndex(
            (prevIndex) =>
              (prevIndex - 1 + roomImages.length) % roomImages.length
          )
        }
      />
      <SliderBox
        title="غذاها"
        error={error}
        images={foodImages}
        index={foodIndex}
        goNext={() =>
          setFoodIndex((nextIndex) => (nextIndex + 1) % foodImages.length)
        }
        goPrev={() =>
          setFoodIndex(
            (prevIndex) =>
              (prevIndex - 1 + foodImages.length) % foodImages.length
          )
        }
      />
      <hr />
      <SearchRoomsBox />
      <div className="aside-main__container">
        <Advertisement />
        <main role="main">
          <RoomCards />
          <hr />
          <SearchFoodsBox />
          <hr />
          <FoodCards flag={flag} setFlag={() => setFlag(!flag)} />
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
