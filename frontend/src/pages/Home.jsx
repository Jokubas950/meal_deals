import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import ItemForm from '../components/ItemForm'

export default function Home() {
  const [items, setMeals] = useState([])

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/items')
        const data = await res.json()
        setMeals(data)
      } catch (err) {
        alert('Failed to fetch items.')
      }
    }

    fetchMeals()
  }, [])

  return (
    <div>
      <h1>All items</h1>
      <ItemForm onMealCreated={newMeal => setMeals(prev => [...prev, newMeal])} />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {items.length === 0 ? (
          <p>No items available.</p>
        ) : (
          items.map(item => (
            <ItemCard key={item._id} item={item} />
          ))
        )}
      </div>
    </div>
  )
}
