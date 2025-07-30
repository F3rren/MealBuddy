import React from 'react';

const Recipes: React.FC = () => {
  const sampleRecipes = [
    {
      id: 1,
      title: "Pasta al Pomodoro",
      description: "Un classico della cucina italiana, semplice e delizioso.",
      emoji: "🍝"
    },
    {
      id: 2,
      title: "Risotto ai Funghi",
      description: "Cremoso risotto con funghi porcini e parmigiano.",
      emoji: "🍄"
    },
    {
      id: 3,
      title: "Tiramisù",
      description: "Il dolce italiano più amato al mondo.",
      emoji: "🍰"
    }
  ];

  return (
    <div>
      <div>
        <h1>Le Mie Ricette</h1>
        <button>
          + Aggiungi Ricetta
        </button>
      </div>

      <div>
        {sampleRecipes.map(recipe => (
          <div key={recipe.id}>
            <div>{recipe.emoji}</div>
            <div>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
