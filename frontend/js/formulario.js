window.onload = async () => {
    const pelicula = await fetch(`http://localhost:3031/api/movies/4`)
        .then(resp => resp.json())
        .then(info => info);

    const inputs = document.querySelectorAll("input");

    for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        if (element.name == "title") {
            element.value = pelicula.data.title;
        }
        if (element.name == "rating") {
            element.value = pelicula.data.rating;
        }
        if (element.name == "awards") {
            element.value = pelicula.data.awards;
        }
        if (element.name == "length") {
            element.value = pelicula.data.length;
        }
        if (element.name == "release_date") {
            const fechaISO = pelicula.data.release_date;
            const fecha = new Date(fechaISO);
            const nuevoFormato = fecha.toISOString().split('T')[0];
            element.value = nuevoFormato;
        }
    }

    /* UPDATE */
    const buttonEdit = document.querySelector(".botonEditar");
    buttonEdit.addEventListener("click", function(e) {
        e.preventDefault();
        const data = {};
        for (let i = 0; i < inputs.length; i++) {
            const element = inputs[i];
            data[element.name] = element.value;
        }
        let settingsPut = {
            "method": "put",
            "headers": {
                "content-type": "application/json",
            },
            "body": JSON.stringify(data)
        };

        fetch(`http://localhost:3031/api/movies/update/4`, settingsPut)
            .then(resp => resp.json())
            .then(info => {
                console.log(info);
              
                for (let key in data) {
                if (data.hasOwnProperty(key)) {
                const input = document.querySelector(`[name="${key}"]`);
                if (input) {
                input.value = data[key];
            }
            }
            }
            });
    });

    /* CREATE */
    const buttonCreate = document.querySelector("#botonAgregar");
    console.log("buttonCreate:", buttonCreate);
    buttonCreate.addEventListener("click", function(e) {
        e.preventDefault();
        const data = {};
        for (let i = 0; i < inputs.length; i++) {
            const element = inputs[i];
            data[element.name] = element.value;
        }
        let settings = {
            "method": "post",
            "headers": {
                "content-type": "application/json",
            },
            "body": JSON.stringify(data)
        };

        fetch("http://localhost:3031/api/movies/create", settings)
            .then(resp => resp.json())
            .then(info => console.log(info));
    });
};