import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { editTifin } from '../../service/operations/tifin';
import { useSelector } from 'react-redux';

function EditTifinModal({ tifin, onClose ,setTifinData}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      price: tifin.price,
    }
  });

  const defaultMenuItems = [
    { day: 'monday', menu: '' },
    { day: 'tuesday', menu: '' },
    { day: 'wednesday', menu: '' },
    { day: 'thursday', menu: '' },
    { day: 'friday', menu: '' },
    { day: 'saturday', menu: '' },
    { day: 'sunday', menu: '' },
  ];

  const [menuItems, setMenuItems] = useState(defaultMenuItems);

  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const mergedMenuItems = defaultMenuItems.map(item => {
      const tifinItem = tifin.menu.find(tifinItem => tifinItem.day === item.day);
      return tifinItem ? tifinItem : item;
    });
    setMenuItems(mergedMenuItems);
  }, [tifin]);

  const onSubmitHandler = async(data) => {
    const formData = new FormData();
    formData.append("menu", JSON.stringify(menuItems));
    formData.append("price", data.price);
    formData.append("id", tifin._id);
    const response = await editTifin(formData, token);
      setTifinData(response)
    onClose(); // Close the modal after submitting
  };

  const handleMenuChange = (e, day) => {
    const { value } = e.target;
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.day === day ? { ...item, menu: value } : item
      )
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Tifin</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
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
          <div className="space-y-4">
            {menuItems.map(({ day, menu }) => (
              <div key={day} className="flex items-center space-x-4">
                <label className="w-24 text-lg font-medium capitalize">{day}</label>
                <input
                  type="text"
                  value={menu}
                  onChange={(e) => handleMenuChange(e, day)}
                  className={`flex-1 border p-2 rounded-md ${
                    !menu ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={`Enter ${day} menu`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 p-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTifinModal;
