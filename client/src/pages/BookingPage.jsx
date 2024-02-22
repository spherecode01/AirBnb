import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import { UserContext } from "../UserContext";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id && user) {
      axios.get(`http://localhost:4000/booking/bookings/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      }).then(response => {
        setBooking(response.data);
      });
    }
  }, [id, user]);

  if (!booking) {
    return '';
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
