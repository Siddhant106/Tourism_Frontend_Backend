import React from "react";
import "./Festivals.css";

function Festival() {
  const festivals = [
    {
      name: "Diwali – The Festival of Lights",
      description:
        "Celebrated all over India, Diwali symbolizes the victory of light over darkness. Homes are decorated with diyas, sweets are shared, and fireworks light up the sky.",
      image: "https://i.pinimg.com/1200x/43/7b/ee/437bee8086f0390fa0e34ddd2450553c.jpg",
    },
    {
      name: "Holi – The Festival of Colors",
      description:
        "Holi is one of the most joyful festivals of India, marking the arrival of spring. People play with colors, dance, and enjoy festive food like gujiya and thandai.",
      image: "https://i.pinimg.com/1200x/7d/dc/52/7ddc5245fba46b09a26b6e03fc140414.jpg",
    },
    {
      name: "Durga Puja – Celebration of Goddess Durga",
      description:
        "Primarily celebrated in West Bengal, Durga Puja honors Goddess Durga’s victory over Mahishasura. Huge idols, pandals, and cultural performances mark the celebration.",
      image: "https://i.pinimg.com/736x/50/e6/29/50e629f4910f7ef83fcc905f3ec3149a.jpg",
    },
    {
      name: "Pongal – Harvest Festival of Tamil Nadu",
      description:
        "Pongal is dedicated to the Sun God and marks the harvest season. People cook the traditional dish ‘Pongal’ and thank nature for a prosperous yield.",
      image: "https://i.pinimg.com/1200x/81/d7/74/81d774c6189537df9423cc36fdfc6500.jpg",
    },
    {
      name: "Ganesh Chaturthi – Welcome Lord Ganesha",
      description:
        "A grand festival celebrated mostly in Maharashtra, it marks the birth of Lord Ganesha. Beautiful idols are installed and immersed in water after days of devotion.",
      image: "https://i.pinimg.com/736x/f6/6c/bc/f66cbc1c020da8dffe928f4c301eba05.jpg",
    },
    {
      name: "Baisakhi – Harvest Festival of Punjab",
      description:
        "Celebrated with great enthusiasm, Baisakhi marks the beginning of the harvest season and the foundation of the Khalsa in Sikhism.",
      image: "https://i.pinimg.com/736x/be/1d/36/be1d36b5ec1a5351217271f3db89374f.jpg",
    },
    {
      name: "Onam – The Spirit of Kerala",
      description:
        "Onam is Kerala’s most famous festival, marked by floral decorations, traditional dance, music, and the famous boat races.",
      image: "https://i.pinimg.com/1200x/a1/ad/7b/a1ad7bf0b6b7f1726a5f331a8951e227.jpg",
    },
    {
      name: "Navratri – Nine Nights of Devotion",
      description:
        "Navratri is celebrated across India with dance (Garba, Dandiya) and devotion to Goddess Durga’s nine forms. The festival concludes with Dussehra.",
      image: "https://i.pinimg.com/736x/16/23/d0/1623d0817a308cdb3a8468f77f8bb155.jpg",
    },
  ];

  return (
    <div className="festival-page">
      <h1>Festivals of India 🎊</h1>
      <p className="festival-intro">
        India is known for its diverse and colorful festivals that celebrate culture, tradition, and togetherness.
      </p>

      <div className="festival-list">
        {festivals.map((fest, index) => (
          <div className="festival-card" key={index}>
            <img src={fest.image} alt={fest.name} />
            <div className="festival-details">
              <h2>{fest.name}</h2>
              <p>{fest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Festival;
