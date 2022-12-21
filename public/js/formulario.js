window.onload = () => {

    console.log('>> formulario')
    let id = window.location.pathname.split("/")[3]

    let title = document.getElementById("title")
    let rating = document.getElementById("rating")
    let awards = document.getElementById("awards")
    let release_date = document.getElementById("release_date")
    let length = document.getElementById("length")

    if (id) {
        
        fetch("http://localhost:3001/api/movies/" + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let movie = data.data

                title.value = movie.title
                rating.value = movie.rating
                awards.value = movie.awards
                release_date.value = moment(movie.release_date).format('yyyy-MM-DD')
                length.value = movie.length

            })
            .catch(function (error) {
                console.log(error)
            })

        let botonEdit = document.getElementById("botonParaActualizar")
        document.getElementById("botonParaAgregar").style.display = "none"

        const putData = async () => {
            const dataUpdate = {
                title: title.value,
                rating: rating.value,
                awards: awards.value,
                release_date: release_date.value,
                length: length.value,
                genre_id: "1"
            };

            try {
                let response = await fetch('/api/movies/update/' + id, {
                    method: 'PUT', // or 'PUT'
                    body: JSON.stringify(dataUpdate),
                    headers: {
                        'content-Type': 'application/json',
                    },

                })

                if (response.ok) {
                    const jsonResponse = await response.json()

                    console.log(jsonResponse, "ghola")
                }

            } catch (error) {
                console.error('Error:', error);
            }
        }
        botonEdit.addEventListener("click", async (e) => {
            e.preventDefault()
            await putData()
        })
    } else {
        let botonAdd = document.getElementById("botonParaAgregar")
        document.getElementById("botonParaActualizar").style.display = "none"
        document.getElementById("botonParaEliminar").style.display = "none"
        
        
        const postData = async () => {
            const dataCreate = {
                title: title.value,
                rating: rating.value,
                awards: awards.value,
                release_date: release_date.value,
                length: length.value,
                genre_id: "1"
            };

            try {
                let response = await fetch('/api/movies/create', {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(dataCreate),
                    headers: {
                        'content-Type': 'application/json',
                    },
                })

                if (response.ok) {
                    const jsonResponse = await response.json()

                    console.log(jsonResponse, "ghola")
                }

            } catch (error) {
                console.error('Error:', error);
            }
        }
        botonAdd.addEventListener("click", async (e) => {
            e.preventDefault()
            await postData()
            botonAdd.submit()
        })
    }

}