import { useEffect, useState } from 'react'
import MealCard from '../components/MealCard'

export default function Home() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/meals')
        const data = await res.json()
        setMeals(data)
      } catch (err) {
        alert('Failed to fetch meals.')
      }
    }

    fetchMeals()
  }, [])

  return (
    <div>
      <h1>All Meals</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {meals.length === 0 ? (
          <p>No meals available.</p>
        ) : (
          meals.map(meal => (
            <MealCard key={meal._id} meal={meal} />
          ))
        )}
      </div>
    </div>
  )
}
