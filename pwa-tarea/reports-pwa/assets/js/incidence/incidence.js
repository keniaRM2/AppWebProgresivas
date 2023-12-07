let idUser = 0;
(() => {
    'use strict';
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    idUser = payload.id;
})();


let annexes = [];

const incidenceForm = document.getElementById('incidenceForm');
const annexesForm = document.getElementById('annexesForm');

const submitIncidenceForm = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (incidenceForm.checkValidity()) {


        const title = document.getElementById('title').value;
        const incidenceDate = document.getElementById('incidenceDate').value;
        const location = "{}";
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value;
        const idUserArea = document.getElementById('area').value;


        try {
            const response = await axiosClient.post(`/incidences/save`, {
                title,
                type,
                description,
                incidenceDate,
                userId: idUserArea,
                annexes,
                location
            });

            toastMessage('Incidencia registrada!').showToast();
            window.history.back();

        } catch (error) {
            console.log(error);
            toastMessage('Ocurrió un error durante el registro.').showToast();
        }
    }
};

const submitAnexesForm = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (annexesForm.checkValidity()) {



        const input = document.getElementById('archivo');
        const archivo = input.files[0];
        const lector = new FileReader();

        lector.onload = function (event) {
            const file = event.target.result;
            const name = archivo.name;
            const mimeType = archivo.type;

            annexes.push({
                name,
                mimeType,
                file
            });

            console.log(annexes);





            document.getElementById('archivo').value = '';
            document.getElementById('annexesForm').reset();

            var myModalEl = document.getElementById('modalAnexos');
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide();

            let htmlArchivos = annexes.map((archivo) => {
                return `
                <div class="col-3">
                    ${archivo.name}
                </div>
                `;
            });

            htmlArchivos = htmlArchivos.join("");

            document.getElementById('anexos').innerHTML = htmlArchivos;


        };

        lector.readAsDataURL(archivo);
    }
};

incidenceForm.addEventListener('submit', submitIncidenceForm);
annexesForm.addEventListener('submit', submitAnexesForm);



const listAreas = async () => {

    try {
        const {
            areas
        } = await axiosClient.post(`/user/areas`, {
            id: idUser
        });

        const selectType = document.getElementById('area'); // Obtener el elemento select

        areas.forEach(function (item) {
            const option = document.createElement('option'); // Crear un elemento option
            option.value = item.idUserArea; // Asignar el valor del objeto al atributo value del option
            option.textContent = item.name; // Asignar el nombre del objeto al contenido visible del option
            selectType.appendChild(option); // Agregar el option al select
        });

        if (areas.length <= 0) {
            toastMessage('Sin áreas asignadas').showToast();
        }
    } catch (error) {
        console.log(error);
        toastMessage('Sin áreas asignadas').showToast();
    }
};


listAreas();