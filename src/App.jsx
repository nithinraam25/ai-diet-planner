import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({ age: "", weight: "", height: "", gender: "male", goal: "fat loss", veg: "veg" });
  const [plan, setPlan] = useState(null);

  const calculate = () => {
    const w = parseFloat(form.weight), h = parseFloat(form.height), age = parseFloat(form.age);
    if(!w || !h || !age) return alert("Age Weight Height fill maadu bro!");
    let bmr = form.gender === "male" ? 10*w + 6.25*h -5*age +5 : 10*w + 6.25*h -5*age -161;
    let tdee = bmr * 1.4;
    if(form.goal==="fat loss") tdee-=400;
    if(form.goal==="muscle gain") tdee+=300;
    const vegPlan = {
      breakfast: "Oats + Milk + 1 Banana + 5 Almonds",
      lunch: "Brown Rice + Dal + Curd + Veg Curry",
      evening: "Green Tea + Roasted Chana",
      dinner: "2 Chapati + Veg Sabzi + Paneer 50g",
      protein: "65-80g"
    };
    const nonVegPlan = {
      breakfast: "3 Egg Whites + 1 Whole Egg + Oats",
      lunch: "Rice + Chicken 150g + Curd",
      evening: "Whey / Sprouts",
      dinner: "2 Chapati + Chicken/Fish 150g",
      protein: "90-110g"
    };
    const p = form.veg==="veg"?vegPlan:nonVegPlan;
    setPlan({ calories: Math.round(tdee), ...p });
  };

  return (
    <div style={{maxWidth:500,margin:"20px auto",fontFamily:"sans-serif",textAlign:"center",padding:15}}>
      <h1 style={{color:"#2e7d32"}}>🥗 AI DIET PLANNER</h1>
      <div style={{background:"white",padding:20,borderRadius:15,boxShadow:"0 4px 15px rgba(0,0,0,0.1)",display:"flex",flexDirection:"column",gap:12}}>
        <input placeholder="Age" type="number" value={form.age} onChange={e=>setForm({...form, age:e.target.value})} style={{padding:12,borderRadius:8,border:"1px solid #ccc"}}/>
        <input placeholder="Weight (kg)" type="number" value={form.weight} onChange={e=>setForm({...form, weight:e.target.value})} style={{padding:12,borderRadius:8,border:"1px solid #ccc"}}/>
        <input placeholder="Height (cm)" type="number" value={form.height} onChange={e=>setForm({...form, height:e.target.value})} style={{padding:12,borderRadius:8,border:"1px solid #ccc"}}/>
        <select value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})} style={{padding:12,borderRadius:8}}><option value="male">Male</option><option value="female">Female</option></select>
        <select value={form.goal} onChange={e=>setForm({...form, goal:e.target.value})} style={{padding:12,borderRadius:8}}><option value="fat loss">Fat Loss</option><option value="muscle gain">Muscle Gain</option><option value="maintain">Maintain</option></select>
        <select value={form.veg} onChange={e=>setForm({...form, veg:e.target.value})} style={{padding:12,borderRadius:8}}><option value="veg">Veg</option><option value="non-veg">Non-Veg</option></select>
        <button onClick={calculate} style={{padding:14,background:"#2e7d32",color:"white",border:"none",borderRadius:10,fontSize:18,fontWeight:"bold"}}>Generate My Diet Plan</button>
      </div>
      {plan && (
        <div style={{background:"#f1f8e9",padding:20,borderRadius:15,marginTop:20,textAlign:"left"}}>
          <h2>🔥 {plan.calories} kcal/day</h2>
          <p><b>Protein:</b> {plan.protein}</p>
          <p><b>🌅 Breakfast:</b> {plan.breakfast}</p>
          <p><b>☀️ Lunch:</b> {plan.lunch}</p>
          <p><b>🌇 Evening:</b> {plan.evening}</p>
          <p><b>🌙 Dinner:</b> {plan.dinner}</p>
          <small>Drink 3.5L water + 7000 steps daily</small>
        </div>
      )}
    </div>
  )
}
export default App;