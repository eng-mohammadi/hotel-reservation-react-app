import React, { useState } from "react";
import { filterRooms } from "../../../redux/rooms/actions";
import {
  getFilteredRooms,
  getFilteredRoomsCount,
} from "../../../redux/rooms/selectors";
import { useDispatch, useSelector } from "react-redux";

const SearchRoomsBox = () => {
  const rooms = useSelector((state) => getFilteredRooms(state) || []);
  const roomsCount = useSelector((state) => getFilteredRoomsCount(state));

  const [searchTerm, setSearchTerm] = useState(false);

  const dispatch = useDispatch();

  const [filterName, setFilterName] = useState("");
  const [filterCapacity, setFilterCapacity] = useState("");
  const [filterPricePerNight, setFilterPricePerNight] = useState("");
  const [filterAmenities, setFilterAmenities] = useState("");

  const searchResultHandler = () => {
    dispatch(
      filterRooms({
        filterName,
        filterCapacity,
        filterPricePerNight,
        filterImagesEnabled: false,
        filterAmenitiesList: filterAmenities ? [filterAmenities] : [],
      })
    );
    setSearchTerm(!searchTerm);
  };

  return (
    <React.Fragment>
      <div className="search-box">
        <h3>تعداد اتاق ها: {roomsCount}</h3>
        <h3>جستجوی اتاق</h3>
        <div className="search-box__container">
          <input
            type="text"
            name="name"
            placeholder="جستجوی اتاق..."
            autoComplete="off"
            value={filterName}
            onChange={(event) => setFilterName(event.target.value)}
          />
          <input
            type="number"
            name="price"
            placeholder="حداکثر قیمت"
            autoComplete="off"
            value={filterPricePerNight}
            onChange={(event) => setFilterPricePerNight(event.target.value)}
          />
          <input
            type="number"
            name="capacity"
            autoComplete="off"
            placeholder="حداکثر ظرفیت"
            value={filterCapacity}
            onChange={(event) => setFilterCapacity(event.target.value)}
          />
          <select
            name="amenities"
            value={filterAmenities}
            onChange={(event) => setFilterAmenities(event.target.value)}
          >
            <option value="">انتخاب امکانات</option>
            <option value="وای فای">وای فای</option>
            <option value="تلویزیون">تلویزیون</option>
            <option value="یخچال">یخچال</option>
            <option value="قهوه ساز">قهوه ساز</option>
            <option value="بالکن خصوصی">بالکن خصوصی</option>
            <option value="آشپزخانه کوچک">آشپزخانه کوچک</option>
            <option value="سشوار">سشوار</option>
          </select>
          <button type="button" onClick={searchResultHandler}>
            جستجو
          </button>
        </div>
        <div className="search-rooms-result">
          {searchTerm &&
            Array.isArray(rooms) &&
            rooms.map((room) => (
              <div className="search-rooms-result__item" key={room.id}>
                <h4>{room.name}</h4>
                <h4>تصاویر اتاق</h4>
                <div className="search-rooms-result__images">
                  {room.images.map((image, index) => (
                    <img key={index} src={image} alt={`image_${room.id}`} />
                  ))}
                </div>
                <p>قیمت: {room.pricePerNight} تومان</p>
                <p>ظرفیت: {room.capacity} نفر</p>
                <p>امکانات: {room.amenities.join(", ")}</p>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchRoomsBox;
