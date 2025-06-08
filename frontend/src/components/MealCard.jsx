import { useState } from 'react'

export default function MealCard({ meal }) {
  const [orders, setOrders] = useState(meal.orders || 0)
  const [liked, setLiked] = useState(false) // new state

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/orders/${meal._id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) throw new Error('Toggle like failed')
      const data = await res.json()

      setOrders(data.count)
      setLiked(data.liked)
    } catch (err) {
      alert('Failed to toggle like')
    }
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem',
      width: '250px'
    }}>
      <h3>{meal.title}</h3>
      <h4>{meal.price}</h4>
      <p>{meal.description}</p>
      <button>buy</button>
      <button
        onClick={handleLike}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: liked ? 'red' : 'gray'
        }}
      >
        ❤️ {orders}
      </button>
    </div>
  )
}
