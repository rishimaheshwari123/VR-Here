import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateTifin, findTifin } from "../../service/operations/tifin";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { allLocations, imageUpload } from "../../service/operations/room";
import DisplayTifin from "../../components/tifin/DisplayTifin";
// import DisplayTifin from "../../components/tifin/DisplayTifin";

const TifinForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, setValue
  } = useForm();
  const [locations, setLocation] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [tifinAvailable, setTifinAvailable] = useState(false);
  const [tifinData, setTifinData] = useState(false);
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
    form.append("LocationID", data.location);
    form.append("name", data.name);
    form.append("price", data.price);
    form.append("type", data.type);
    form.append("tag", JSON.stringify(data.tag));

    form.append("customize", data.customize);
    form.append("images", JSON.stringify(images));
    form.append("menu", JSON.stringify(menuItems)); // Assuming menu items are comma separated
    form.append(
      "leading",
      JSON.stringify([{ name: data.leadingName, number: data.leadingNumber }])
    );
    form.append("vendor", data.vendor);

    // Debug: Log FormData entries
    // for (let [key, value] of form.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    await CreateTifin(form, token);
    // Send form data to the API or handle as needed
    // Example: axios.post('/api/submit', form)
  };

  const fetchLocations = async () => {
    setLoading(true);
    const response = await allLocations();
    setLocation(response);
    setLoading(false);
  };

  const fetchTifin = async (token) => {
    try {
      setLoading(true);
      const response = await findTifin(token);
      setTifinData(response[0]);

      // Check if response is not an empty array
      if (Array.isArray(response) && response.length > 0) {
        setTifinAvailable(true);
      } else {
        setTifinAvailable(false);
      }
    } catch (error) {
      console.error("Error fetching tifin data:", error);
      setTifinAvailable(false);
    } finally {
      setLoading(false);
    }
  };
  const [menuItems, setMenuItems] = useState([
    { day: "monday", menu: "" },
    { day: "tuesday", menu: "" },
    { day: "wednesday", menu: "" },
    { day: "thursday", menu: "" },
    { day: "friday", menu: "" },
    { day: "saturday", menu: "" },
    { day: "sunday", menu: "" },
  ]);

  // Handler for input change
  const handleInputChange = (e, day) => {
    const { value } = e.target;
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.day === day ? { ...item, menu: value } : item
      )
    );
  };

  useEffect(() => {
    fetchLocations();
    fetchTifin(token);
  }, []);


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

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {tifinAvailable ? (
        <>
          <DisplayTifin tifin={tifinData} setTifinData={setTifinData} />
        </>
      ) : (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Tifin Details Form</h2>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Tifin Name</label>
              <input
                type="text"
                {...register("name", { required: "Tifin Name is required" })}
                className={`border p-2 rounded-md ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">Price</label>
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
                <label className="text-lg font-medium mb-2">Type</label>
                <select
                  {...register("type", { required: "Type is required" })}
                  className={`border p-2 rounded-md ${
                    errors.type ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a type</option>{" "}
                  {/* Placeholder option */}
                  <option value="veg">Only Veg</option>
                  <option value="nonveg">Non Veg</option>
                  <option value="veg&nonveg">Veg & Non Veg</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-medium mb-2">Customize</label>
                <input
                  type="text"
                  {...register("customize", {
                    required: "Customize is required",
                  })}
                  className={`border p-2 rounded-md ${
                    errors.customize ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.customize && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customize.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {menuItems.map(({ day, menu }) => (
                <div
                  key={day}
                  className="flex items-center space-x-4 border p-4 rounded-md shadow-sm bg-white"
                >
                  <label className="w-32 text-lg font-medium capitalize">
                    {day}
                  </label>
                  <input
                    type="text"
                    value={menu}
                    onChange={(e) => handleInputChange(e, day)}
                    className={`flex-1 border p-2 rounded-md ${
                      !menu ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={`Enter ${day} menu`}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Location</label>
              <select
                {...register("location", {
                  required: "Location is required",
                })}
                className={`border p-2 rounded-md ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              >
                {locations.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
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
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 lg:px-4 rounded focus:outline-none focus:shadow-outline flex"
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

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Images</label>
              <Dropzone onDrop={uploadImage}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed p-4 text-center"
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                )}
              </Dropzone>
              <div className="flex flex-wrap mt-4">
                {images.map((image) => (
                  <div key={image.public_id} className="relative">
                    <img
                      src={image.url}
                      alt="Preview"
                      className="w-24 h-24 object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                      onClick={() => removeImage(image.public_id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default TifinForm;
