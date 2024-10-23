import { useState } from 'react';

const CarForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    make: initialData.make || '',
    model: initialData.model || '',
    year: initialData.year || '',
    color: initialData.color || '',
    price: initialData.price || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="make" placeholder="Make" value={form.make} onChange={handleChange} required />
      <input name="model" placeholder="Model" value={form.model} onChange={handleChange} required />
      <input name="year" placeholder="Year" type="number" value={form.year} onChange={handleChange} required />
      <input name="color" placeholder="Color" value={form.color} onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CarForm;