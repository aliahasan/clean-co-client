import { useMutation, useQuery } from "@tanstack/react-query";
import Container from "../components/ui/Container";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";

const Booking = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [address, setAddress] = useState("");
  const myAxios = useAxios();

  const { id } = useParams();

  const { data: service, isLoading } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const res = await myAxios.get(`/services/${id}`);
      return res;
    },
  });
  // const {data: service, isError, isLoading} = query ;

  const userBookingData = {
    customerName,
    email,
    date,
    timeSlot,
    address,
    status: "pending",
    service: service?.data?.name,
  };
  const { mutate } = useMutation({
    mutationKey: ["booking"],
    mutationFn: (bookingData) => {
      return myAxios.post("/user/create-booking", bookingData);
    },
  });

  return (
    <Container className="my-40">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold">{service?.data?.name}</h1>
              <p className="max-w-[60ch] text-xl mt-5">
                {service?.data?.description}
              </p>
              <div className="space-y-4 mt-10">
                {service?.data?.features?.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
            <div>
              <div className="divider max-w-2xl"></div>
              <p className="text-4xl font-semibold">
                {service?.data?.price}${" "}
                <span className="text-xs">vat included</span>{" "}
              </p>
            </div>
          </div>
          <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                  onBlur={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  onBlur={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  required
                  onBlur={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Time Slot</span>
                </label>
                <select
                  className="input input-bordered"
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <option>8am. - 12pm.</option>
                  <option>12pm. - 6pm.</option>
                  <option>6pm. - 10pm.</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <textarea
                  rows={12}
                  className="input input-bordered"
                  onBlur={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <div className="form-control mt-2">
                <button
                  onClick={() => mutate(userBookingData)}
                  type="button"
                  className="btn btn-primary"
                >
                  Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Booking;
