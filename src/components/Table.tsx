import React from "react";

//Деструктуризацию я не делал, вся логика в одном файле

//тип заметки
type task = {
	type: string;
	value?: string;
};

const Table = () => {
	// массив заметок
	const [tasks, setTasks] = React.useState<task[]>([]);

	// хук нужен для того чтобы поймать тип новой заметки
	const [dragType, setDragType] = React.useState<string>("text");

	//функция добавляет новую задачу в зависимости от типа dragType
	const dropCardHandler = () => {
		if (dragType == "text") {
			addNewTask("text");
		} else if (dragType == "image") {
			addNewTask("img");
		}
	};

	//функция которая меняет value объекта с типом image когда пользователь выбирает изображение
	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.target.files != null) {
			let urlImg = URL.createObjectURL(e.target.files[0]);
			console.log("urlImg is:", urlImg);
			let newTasks = tasks.map((item: task, i: number) =>
				i == index
					? {
							type: "image",
							value: urlImg,
					  }
					: item
			);

			setTasks(newTasks);
		}
	};

	// функция добавляет новую заметку определенного типа в массив заметок
	const addNewTask = (type: string) => {
		if (type == "text") {
			setTasks((tasks) => [
				...tasks,
				{
					type: "text",
				},
			]);
		} else if (type == "img") {
			setTasks((tasks) => [
				...tasks,
				{
					type: "image",
					value: "",
				},
			]);
		}
	};

	return (
		<>
			{/* <p className="title_1">Simple Editor</p> */}
			<div className="table">
				<div className="column_1">
					{/* <p className="title_1">Sidebar</p> */}

					<p
						className="drag"
						draggable="true"
						onDragStart={(e) => setDragType("text")}
					>
						Text
					</p>

					<p
						className="drag"
						draggable="true"
						onDragStart={(e) => setDragType("image")}
					>
						Image
					</p>
				</div>
				<div className="column_2">
					{/* <p className="title_1">Workarea</p> */}
					<div
						className="drop"
						// если не выключить обычное поведение onDragOver то перетащить не получится
						onDragOver={(e) => {
							e.preventDefault();
						}}
						onDrop={() => dropCardHandler()}
					>
						{tasks.map((item: task, index: number) =>
							item.type == "text" ? (
								<div className="drop_text">
									<textarea placeholder="input your text..."></textarea>
								</div>
							) : (
								<div className="drop_img">
									{item.value ? (
										<img src={item.value} alt="" />
									) : (
										<>
											<input
												type="file"
												onChange={(e) =>
													handleImageChange(e, index)
												}
											/>
										</>
									)}
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Table;
