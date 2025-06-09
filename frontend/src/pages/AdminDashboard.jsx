import { useEffect, useState } from 'react'
import ItemForm from '../components/ItemForm'
import ItemCard from '../components/ItemCard'

export default function AdminDashboard() {
  const [items, setMeals] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(setMeals)
  }, [])

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}
