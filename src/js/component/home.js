import React, { useEffect, useState } from "react";
//la siguiente línea debe ir en el sevidor back-end 
//import flask_corse import CORS //pipenv install flask-CORS

//Se tomó el ejercicio de https://github.com/maruchf para el front-end

//component
function Home() {
	const BASE_URL =
		"https://3245-c181d190-54dc-4dba-a45a-442802d9cead.ws-us03.gitpod.io"; //debo abrir el servidor y puertos indicados en gitpod
	const [tarea, guardarTarea] = useState("");
	const [lista, guardarLista] = useState([]);
	//crear una función para eliminar ítems del arreglo desde un botón
	const eliminaItems = async (indexItem, listaActual) => {
		let response = await fetch(`${BASE_URL}/todos`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});
		await obtenerTareas();
	};
	const obtenerTareas = async () => {
		try {
			let response = await fetch(`${BASE_URL}/todos`);
			let APILista = await response.json();
			guardarLista(APILista);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		obtenerTareas(`${BASE_URL}/todos`);
		// fetch(url)
		// 	.then(response => response.json())
		// 	.then(APILista => guardarLista(APILista))
		// 	.catch(error => console.log(`{error}`));
	}, []);
	const agregarTarea = async () => {
		let body = {
			label: tarea,
			done: false
		};
		let response = await fetch(`${BASE_URL}/todos`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: { "Content-Type": "application-json" }
		});
		if (response.ok) {
			guardarTarea("");
			await obtenerTareas();
		} else {
			console.log(response.status);
		}
	};

	return (
		<div className="container-fluid col-8">
			<h1 className="text-center">Lista de tareas</h1>
			<div className="Group">
				<input
					value={tarea}
					onKeyDown={async e => {
						if (e.key == "Enter") {
							await agregarTarea();
						}
					}}
					onChange={e => {
						guardarTarea(e.target.value);
					}}
					type="text"
					placeholder="Ingresa tus tareas aquí"
				/>
				<div className="card">
					<ul className="list-group list-group-flush">
						{lista.map((tarea, index) => {
							return (
								<li
									key={index}
									className="list-group-item d-flex justify-content-between"
									onClick={e =>
										eliminaItems(index, [...lista])
									}>
									{tarea.label}
									<div>
										<i className="fas fa-times" />
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="card-footer text-muted">
				<p>{lista.length} tareas pendientes</p>
			</div>
		</div>
	);
}

export default Home;
