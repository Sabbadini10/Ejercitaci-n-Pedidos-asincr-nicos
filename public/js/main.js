window.onload = () => {

  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  console.log(' >>>>>>>>>>>>> conectado')
  

fetch("http://localhost:3031/api/movies/")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let respuesta = data.data;
      let favoritas = localStorage.getItem('favorite')
     console.log(favoritas)
      if (JSON.parse(favoritas).length > 0) {
         document.getElementById("peliFavorita").innerHTML = "Mis películas favoritas"
      }
      respuesta.forEach((movie) => {

        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;
        if (favoritas.includes(movie.id)) {
          h1.innerHTML += `<br><i class='fa-solid fa-star' id='${movie.id}'></i>`
        }else{
          h1.innerHTML += `<br><i class='fa-regular fa-star' id='${movie.id}'></i>`
        }
        

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        const boton = document.createElement("button");
        boton.innerHTML = `<a href='http://localhost:3001/movies/detail/${movie.id}'> Editar </a>`;

        container.appendChild(card);

        card.appendChild(h1);

        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);

        card.appendChild(boton);

        let estrellita = document.getElementById(`${movie.id}`)
        estrellita.addEventListener("click", (e) => {
          let id = e.target.id
          let carListFav = [id]
          
          let recoveredData = localStorage.getItem('favorite')//Miramos si ya hemos guardado algo anteriormente.

          if (recoveredData == null) {//No tenemos nada guardado, por lo cual vamos a guardar el carListFav
            localStorage.setItem('favorite', JSON.stringify(carListFav))
          } else {//Tenemos algo, por lo cual vamos a añadir un nuevo coche
            let data = JSON.parse(recoveredData)
            let newCar = id

              if (!data.includes(newCar)) {
                data.push(newCar)
                estrellita.classList.remove("fa-regular")
                estrellita.classList.add("fa-solid")
                localStorage.setItem('favorite', JSON.stringify(data))
              } else {//Asegurate que lo que guardes es realmente un array.
                let indice = data.indexOf(newCar);
                data.splice(indice, 1);

                estrellita.classList.remove("fa-solid")
                estrellita.classList.add("fa-regular")
                localStorage.setItem('favorite', JSON.stringify(data))
              }
            };   
        })
      });
    })
    .catch(function (error) {
      console.log(error)
    }) 
}


