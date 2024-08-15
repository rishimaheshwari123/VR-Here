import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  allLocations,
  CreateRooms,
  findRoom,
  imageUpload,
} from "../../service/operations/room";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import DisplayRoom from "../../components/room/DisplayRoom";

const RoomForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [locations, setLocation] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [roomAvailble, setRoomsAvialble] = useState(false);
  const [roomData, setRoomsData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const uploadImage = async (acceptedFiles) => {
    const response = await imageUpload(acceptedFiles);
    const uploadedImages = response?.map((image) => ({
      public_id: image?.asset_id,
      url: image?.url,
    }));
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };
  const removeImage = (publicId) => {
    const updatedImages = images.filter(
      (image) => image.public_id !== publicId
    );
    setImages(updatedImages);
  };

  const onSubmitHandler = async (data) => {
    // Create a new FormData object
    const form = new FormData();

    // Append each field from the data object to FormData
    form.append("LocationID", data.Location);
    form.append("ac", data.ac);
    form.append("closingTime", data.closingTime);
    form.append("contact", data.contact);
    form.append("tag", JSON.stringify(data.tag));

    form.append("depositeAmount", data.depositeAmount);
    form.append("desc", data.desc);
    form.append("AvailableForBoysOrGirl", data.AvailableForBoysOrGirl);
    form.append("drinking", data.drinking);
    form.append("foodAvailable", data.foodAvailable);
    form.append("maintenance", data.maintenance);
    form.append("noticePeriod", data.noticePeriod);
    form.append("oppositeGender", data.oppositeGender);
    // form.append("pBackup", data.pBackup);
    form.append("vegNonveg", data.vegNonveg);
    form.append("parking", data.parking);
    form.append("pgName", data.pgName);
    form.append("powerBackup", data.powerBackup);
    form.append("price", data.price);
    form.append("smocking", data.smocking);
    form.append("totalRoom", data.totalRoom);
    form.append("visitorEntry", data.visitorEntry);
    // form.append("water", data.water);
    form.append("waterCharges", data.waterCharges);
    form.append("wifi", data.wifi);
    form.append("wordan", data.wordan);
    form.append("Laundry", data.Laundry);
    form.append("images", JSON.stringify(images));
    await CreateRooms(form, token);
  };

  const fetchLocations = async () => {
    setLoading(true);
    const response = await allLocations();
    console.log(response);
    setLocation(response);
    setLoading(false);
  };
  const fetchRoom = async (token) => {
    try {
      setLoading(true);
      const response = await findRoom(token);

      console.log(response[0]);
      setRoomsData(response[0]);

      if (Array.isArray(response) && response.length > 0) {
        setRoomsAvialble(true);
      } else {
        setRoomsAvialble(false);
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
      setRoomsAvialble(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput) {
      const formattedTag = tagInput.trim().replace(/\s+/g, "-");

      console.log(formattedTag);
      const updatedTags = [...tags, formattedTag];
      setTags(updatedTags);
      setValue("tag", updatedTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setValue("tag", updatedTags);
  };

  useEffect(() => {
    fetchLocations();
    fetchRoom(token);
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <>
      {roomAvailble ? (
        <>
          <DisplayRoom room={roomData} onUpdate={setRoomsData} />
        </>
      ) : (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Room Details Form</h2>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">PG Name</label>
              <input
                type="text"
                {...register("pgName", { required: "PG Name is required" })}
                className={`border p-2 rounded-md ${
                  errors.pgName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.pgName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pgName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Description</label>
              <textarea
                {...register("desc", { required: "Description is required" })}
                className={`border p-2 rounded-md ${
                  errors.desc ? "border-red-500" : "border-gray-300"
                }`}
                rows="4"
              />
              {errors.desc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.desc.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">
                  Rent Per Month
                </label>
                <input
                  type="text"
                  {...register("price", { required: "Price is required" })}
                  className={`border p-2 rounded-md ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">
                  Deposit Amount
                </label>
                <input
                  type="text"
                  {...register("depositeAmount", {
                    required: "Deposit Amount is required",
                  })}
                  className={`border p-2 rounded-md ${
                    errors.depositeAmount ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.depositeAmount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.depositeAmount.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">
                  Maintenance Charge (if no charge Enter 0)
                </label>
                <input
                  type="text"
                  {...register("maintenance", {
                    required: "Maintenance is required",
                  })}
                  className={`border p-2 rounded-md ${
                    errors.maintenance ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.maintenance && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.maintenance.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">
                  Notice Period (Ex. 0-100)
                </label>
                <input
                  type="text"
                  {...register("noticePeriod", {
                    required: "Notice Period is required",
                  })}
                  className={`border p-2 rounded-md ${
                    errors.noticePeriod ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.noticePeriod && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.noticePeriod.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">
                  Water Charges (if no charge Enter 0)
                </label>
                <input
                  type="text"
                  {...register("waterCharges", {
                    required: "Water Charges are required",
                  })}
                  className={`border p-2 rounded-md ${
                    errors.waterCharges ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.waterCharges && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.waterCharges.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">Total Room</label>
                <input
                  type="text"
                  {...register("totalRoom", {
                    required: "Total Room is required",
                  })}
                  className={`border p-2 rounded-md ${
                    errors.totalRoom ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.totalRoom && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.totalRoom.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {[
                { label: "Food Available", name: "foodAvailable" },
                { label: "AC Rooms", name: "ac" },
                { label: "Parking", name: "parking" },
                { label: "Power Backup", name: "powerBackup" },
                { label: "Visitor Entry", name: "visitorEntry" },
                { label: "Non-Veg Allowed", name: "vegNonveg" },
                { label: "Opposite Gender", name: "oppositeGender" },
                { label: "Smoking Allowed", name: "smocking" },
                { label: "Drinking Allowed", name: "drinking" },
                { label: "Wifi Availble", name: "wifi" },
                { label: "Wordone ", name: "wordan" },
                { label: "Laundry Facility", name: "Laundry" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
                >
                  <label className="text-lg font-medium mb-2">
                    {item.label}:
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`${item.name}-yes`}
                        value="true"
                        {...register(item.name)}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`${item.name}-yes`}
                        className="flex items-center cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white rounded-lg border border-gray-300 px-4 py-2 transition"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`${item.name}-no`}
                        value="false"
                        {...register(item.name)}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`${item.name}-no`}
                        className="flex items-center cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white rounded-lg border border-gray-300 px-4 py-2 transition"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Contact</label>
              <input
                type="text"
                {...register("contact", { required: "Contact is required" })}
                className={`border p-2 rounded-md ${
                  errors.contact ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Location</label>
              <select
                {...register("Location", { required: "Location is required" })}
                className={`border p-2 rounded-md ${
                  errors.Location ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a location</option>
                {locations?.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.Location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Location.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Availble For</label>
              <select
                {...register("AvailableForBoysOrGirl", {
                  required: "Location is required",
                })}
                className={`border p-2 rounded-md ${
                  errors.AvailableForBoysOrGirl
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="">Availble For</option>
                <option value="boy">Boys</option>
                <option value="girls">Girls</option>
                <option value="boys&girls">Both</option>
              </select>
              {errors.AvailableForBoysOrGirl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.AvailableForBoysOrGirl.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Closing Time</label>
              <input
                type="text"
                {...register("closingTime", {
                  required: "Closing Time is required",
                })}
                className={`border p-2 rounded-md ${
                  errors.closingTime ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.closingTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.closingTime.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2  flex-col">
                <label className="text-lg font-medium mb-2">
                  Search Keywords
                </label>

                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div>
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex"
                  >
                    Add Keywords
                  </button>
                </div>
              </div>
              <div className="mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="dropzone-wrapper">
                <Dropzone
                  onDrop={(acceptedFiles) => uploadImage(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>

              <div className="images-preview flex gap-4 mt-4 flex-wrap">
                {images?.map((image, index) => (
                  <div className="relative" key={index}>
                    <button
                      type="button"
                      onClick={() => removeImage(image.public_id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <img
                      src={image.url}
                      alt=""
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RoomForm;
