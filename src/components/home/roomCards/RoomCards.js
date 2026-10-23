import React from "react";
import { useGetRoomsQuery } from "../../../redux/services/roomsApi";
import { Link } from "react-router-dom";

const RoomCards = () => {
  const { data: rooms, isLoading, error } = useGetRoomsQuery();

  if (error) {
    return <h1 className="error-title">خطا: {error}</h1>;
  } else if (isLoading) {
    return <h2 className="loading-title">در حال بارگذاری....</h2>;
  } else {
    return (
      <React.Fragment>
        <div className="room-cards">
          {rooms.map((room) => (
            <Link key={room.id} to={`/rooms/${room.name}`}>
              <div className="room-card__box">
                <div className="room-image">
                  <img src={room.images[0]} alt={`image_${room.id}`} />
                </div>
                <p className="room-name"> {room.name}</p>
                <p>ظرفیت: {room.capacity}</p>
                <p>
                  قیمت هر شب: {room.pricePerNight.toLocaleString("fa-IR")} تومان
                </p>
                <p>امکانات:</p>
                {room.amenities.map((amenity, index) => (
                  <ul key={index}>
                    <li>{amenity}</li>
                  </ul>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </React.Fragment>
    );
  }
};

export default RoomCards;
