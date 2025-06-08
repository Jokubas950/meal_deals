import { useState } from 'react'

export default function MealForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, price, imageUrl })
      })
      if (!res.ok) throw new Error('Meal creation failed')
      alert('Meal created successfully')
      setTitle('')
      setDescription('')
      setPrice('')
      setImageUrl('')
    } catch (err) {
      alert('Failed to create meal')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Meal</h2>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
      <input type="text" placeholder="Image URL (optional)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      <button type="submit">Create Meal</button>
    </form>
  )
}
