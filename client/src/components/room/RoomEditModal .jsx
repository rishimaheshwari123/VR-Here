import React, { useState, useEffect } from "react";
import { imageUpload, updateRoom } from "../../service/operations/room";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";

const RoomEditModal = ({ isOpen, onClose, room, onSave }) => {
  const [editableRoom, setEditableRoom] = useState(room);
  const { token } = useSelector((state) => state.auth);
  const [images, setImages] = useState(room?.images || []);

  useEffect(() => {
    setEditableRoom(room);
  }, [room]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableRoom({ ...editableRoom, [name]: value });
  };

  const handleSave = async () => {
    const arrayImage = JSON.stringify(images);
    const updatedRoom = {
      ...editableRoom,
      images: arrayImage,
      _id: room?._id,
    };
    console.log(updatedRoom);
    const response = await updateRoom(updatedRoom, token);
    console.log(response);
    onSave(editableRoom);
    onClose();
  };

  const uploadImage = async (acceptedFiles) => {
    const response = await imageUpload(acceptedFiles);
    const uploadedImages = response?.map((image) => ({
      public_id: image.asset_id,
      url: image.url,
    }));
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const removeImage = (publicId) => {
    const updatedImages = images.filter(
      (image) => image.public_id !== publicId
    );
    setImages(updatedImages);
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Room Details</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Price (INR):</label>
            <input
              type="number"
              name="price"
              value={editableRoom.price || ""}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Available Rooms:</label>
            <input
              type="number"
              name="totalRoom"
              value={editableRoom.totalRoom || ""}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Deposit Amount (INR):</label>
            <input
              type="number"
              name="depositeAmount"
              value={editableRoom.depositeAmount || ""}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Water Charges:</label>
            <input
              type="number"
              name="waterCharges"
              value={editableRoom.waterCharges || ""}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Closing Time:</label>
            <input
              type="text"
              name="closingTime"
              value={editableRoom.closingTime || ""}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Food Available:</label>
            <input
              type="checkbox"
              name="foodAvailable"
              checked={editableRoom.foodAvailable === "true"}
              onChange={() =>
                setEditableRoom({
                  ...editableRoom,
                  foodAvailable:
                    editableRoom.foodAvailable === "true" ? "false" : "true",
                })
              }
              className="mr-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Available For Boys/Girls:
            </label>
            <select
              name="AvailableForBoysOrGirl"
              value={editableRoom.AvailableForBoysOrGirl || ""}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="boy">Boys</option>
              <option value="girl">Girls</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Veg/Non-Veg:</label>
            <select
              name="vegNonveg"
              value={editableRoom.vegNonveg || ""}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>

          {/* Upload Image */}
          <div className="space-y-2 my-10">
            <label htmlFor="images" className="block font-medium text-gray-700">
              Upload Image *
            </label>
            <Dropzone onDrop={uploadImage}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed p-4 text-center cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <aside className="mt-4">
                    <h4>Uploaded Images</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {images?.map((image) => (
                        <div key={image.public_id} className="relative">
                          <img
                            src={image.url}
                            alt="Uploaded"
                            className="h- w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(image.public_id)}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </aside>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default RoomEditModal;
