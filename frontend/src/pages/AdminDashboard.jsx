import { useEffect, useState } from 'react'
import MealForm from '../components/MealForm'
import MealCard from '../components/MealCard'

export default function AdminDashboard() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/meals')
      .then(res => res.json())
      .then(setMeals)
  }, [])

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <MealForm onMealCreated={newMeal => setMeals(prev => [...prev, newMeal])} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {meals.map(meal => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </div>
  )
}
